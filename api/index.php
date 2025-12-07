<?php
/**
 * API Endpoint para o Dashboard de Remarketing
 * Recebe requisições do front-end React e retorna dados em JSON
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verificar API Key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
$validApiKey = defined('REMARKETING_API_KEY') ? REMARKETING_API_KEY : '';

if (!empty($validApiKey) && $apiKey !== $validApiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Router simples
$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = str_replace('/api', '', $path);
$segments = array_filter(explode('/', $path));

// Incluir configurações
require_once __DIR__ . '/../config.php';

// Função para retornar JSON
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
}

// Função para ler dados do arquivo JSON (simulação de banco de dados)
function readData($file) {
    $filePath = __DIR__ . '/data/' . $file . '.json';
    if (!file_exists($filePath)) {
        return [];
    }
    $content = file_get_contents($filePath);
    return json_decode($content, true) ?: [];
}

// Função para salvar dados no arquivo JSON
function saveData($file, $data) {
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $filePath = $dir . '/' . $file . '.json';
    file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT));
}

// Rotas
$route = $segments[0] ?? '';

switch ($route) {
    case 'emails':
        if ($method === 'GET') {
            $emails = readData('emails');
            jsonResponse($emails);
        }
        break;

    case 'templates':
        if ($method === 'GET') {
            $templates = readData('templates');
            jsonResponse($templates);
        } elseif ($method === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);
            $templates = readData('templates');
            $data['id'] = uniqid();
            $data['created_date'] = date('c');
            $data['updated_date'] = date('c');
            $templates[] = $data;
            saveData('templates', $templates);
            jsonResponse($data, 201);
        } elseif ($method === 'PUT' && isset($segments[1])) {
            $id = $segments[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $templates = readData('templates');
            foreach ($templates as &$template) {
                if ($template['id'] === $id) {
                    $template = array_merge($template, $data);
                    $template['updated_date'] = date('c');
                    saveData('templates', $templates);
                    jsonResponse($template);
                }
            }
            jsonResponse(['error' => 'Template not found'], 404);
        }
        break;

    case 'connections':
        if ($method === 'GET') {
            $connections = readData('connections');
            if (isset($segments[1])) {
                $type = $segments[1];
                foreach ($connections as $conn) {
                    if ($conn['type'] === $type) {
                        jsonResponse($conn);
                    }
                }
                jsonResponse(['error' => 'Connection not found'], 404);
            } else {
                jsonResponse($connections);
            }
        } elseif ($method === 'PUT' && isset($segments[1])) {
            $type = $segments[1];
            $data = json_decode(file_get_contents('php://input'), true);
            $connections = readData('connections');
            $found = false;
            foreach ($connections as &$conn) {
                if ($conn['type'] === $type) {
                    $conn = array_merge($conn, $data);
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $data['type'] = $type;
                $data['id'] = uniqid();
                $data['status'] = $data['status'] ?? 'disconnected';
                $connections[] = $data;
            }
            saveData('connections', $connections);
            jsonResponse($found ? $connections[array_search($type, array_column($connections, 'type'))] : $data);
        }
        break;

    case 'settings':
        if ($method === 'GET') {
            $settings = readData('settings');
            jsonResponse($settings[0] ?? []);
        } elseif ($method === 'PUT') {
            $data = json_decode(file_get_contents('php://input'), true);
            $settings = readData('settings');
            if (empty($settings)) {
                $data['id'] = uniqid();
                $settings = [$data];
            } else {
                $settings[0] = array_merge($settings[0], $data);
            }
            saveData('settings', $settings);
            jsonResponse($settings[0]);
        }
        break;

    case 'cart-recovery':
        if ($method === 'GET' && ($segments[1] ?? '') === 'emails') {
            $emails = readData('emails');
            $recoveryEmails = array_filter($emails, fn($e) => ($e['type'] ?? '') === 'recuperacao_carrinho');
            jsonResponse(array_values($recoveryEmails));
        } elseif ($method === 'PUT' && ($segments[1] ?? '') === 'settings') {
            $data = json_decode(file_get_contents('php://input'), true);
            $settings = readData('settings');
            if (empty($settings)) {
                $settings = [['id' => uniqid()]];
            }
            $settings[0] = array_merge($settings[0] ?? [], $data);
            saveData('settings', $settings);
            jsonResponse($settings[0]);
        }
        break;

    case 'whatsapp':
        if ($method === 'GET' && ($segments[1] ?? '') === 'config') {
            $config = readData('whatsapp_config');
            jsonResponse($config[0] ?? []);
        } elseif ($method === 'PUT' && ($segments[1] ?? '') === 'config') {
            $data = json_decode(file_get_contents('php://input'), true);
            $config = readData('whatsapp_config');
            if (empty($config)) {
                $data['id'] = uniqid();
                $config = [$data];
            } else {
                $config[0] = array_merge($config[0], $data);
            }
            saveData('whatsapp_config', $config);
            jsonResponse($config[0]);
        } elseif ($method === 'GET' && ($segments[1] ?? '') === 'messages') {
            $messages = readData('whatsapp_messages');
            jsonResponse($messages);
        } elseif ($method === 'POST' && ($segments[1] ?? '') === 'test') {
            $data = json_decode(file_get_contents('php://input'), true);
            // Simular envio de teste
            jsonResponse(['success' => true, 'message' => 'Mensagem de teste enviada']);
        }
        break;

    case 'logs':
        if ($method === 'GET') {
            $logs = readData('logs');
            jsonResponse($logs);
        }
        break;

    case 'stats':
        if ($method === 'GET') {
            $emails = readData('emails');
            $stats = [
                'total_emails' => count($emails),
                'sent_today' => count(array_filter($emails, fn($e) => date('Y-m-d', strtotime($e['created_date'] ?? '')) === date('Y-m-d'))),
                'open_rate' => 0,
                'click_rate' => 0
            ];
            jsonResponse($stats);
        }
        break;

    default:
        jsonResponse(['error' => 'Route not found'], 404);
}

