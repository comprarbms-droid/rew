<?php
/**
 * Endpoint para receber eventos do sistema de vendas
 * Recebe POST com eventos: order_created, order_paid, etc.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-API-Key');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verificar se é POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed. Use POST.']);
    exit;
}

// Verificar API Key
$apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
$validApiKey = 'rmk_a8f3d9e2b7c4f1a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8e1d4b7c0f3a6e9d2b5c8f1a4e7d0b3c6f9a2e5d8b1c4f7a0e3d6b9c2f5a8';

if ($apiKey !== $validApiKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized. Invalid API Key.']);
    exit;
}

// Ler dados do POST
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON format.']);
    exit;
}

// Validar dados obrigatórios
if (!isset($data['event_type'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing event_type.']);
    exit;
}

// Processar evento
$eventType = $data['event_type'];
$response = ['success' => true, 'message' => 'Event received'];

try {
    switch ($eventType) {
        case 'order_created':
        case 'order_paid':
            $response = processOrderEvent($data);
            break;
        
        case 'cart_abandoned':
            $response = processCartAbandoned($data);
            break;
        
        default:
            $response = ['success' => true, 'message' => 'Event received but not processed', 'event_type' => $eventType];
    }
    
    // Log do evento
    logEvent($eventType, $data, $response);
    
    http_response_code(200);
    echo json_encode($response);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}

/**
 * Processar evento de pedido (criado ou pago)
 */
function processOrderEvent($data) {
    $order = $data['order'] ?? [];
    $customer = $data['customer'] ?? [];
    $product = $data['product'] ?? [];
    $tracking = $data['tracking'] ?? [];
    
    // Salvar email para envio
    $emailData = [
        'id' => uniqid(),
        'type' => $data['event_type'] === 'order_paid' ? 'pedido_aprovado' : 'aguardando_pagamento',
        'customer_name' => $customer['name'] ?? 'Cliente',
        'customer_email' => $customer['email'] ?? '',
        'subject' => $data['event_type'] === 'order_paid' 
            ? 'Seu pedido foi aprovado! 🎉' 
            : 'Aguardando seu pagamento',
        'status' => 'sent',
        'created_date' => date('c'),
        'order_id' => $order['id'] ?? '',
        'order_value' => $order['value'] ?? 0,
        'product_name' => $product['name'] ?? '',
        'tracking' => $tracking
    ];
    
    // Salvar em arquivo JSON (simulação de banco)
    saveEmail($emailData);
    
    // Aqui você pode adicionar lógica para:
    // - Enviar email via Brevo
    // - Enviar WhatsApp
    // - Processar template
    // etc.
    
    return [
        'success' => true,
        'message' => 'Order event processed',
        'event_type' => $data['event_type'],
        'email_id' => $emailData['id']
    ];
}

/**
 * Processar carrinho abandonado
 */
function processCartAbandoned($data) {
    $customer = $data['customer'] ?? [];
    $cart = $data['cart'] ?? [];
    
    $emailData = [
        'id' => uniqid(),
        'type' => 'recuperacao_carrinho',
        'customer_name' => $customer['name'] ?? 'Cliente',
        'customer_email' => $customer['email'] ?? '',
        'subject' => 'Você esqueceu algo no carrinho!',
        'status' => 'sent',
        'created_date' => date('c'),
        'cart_value' => $cart['value'] ?? 0,
        'cart_items' => $cart['items'] ?? []
    ];
    
    saveEmail($emailData);
    
    return [
        'success' => true,
        'message' => 'Cart abandoned event processed',
        'email_id' => $emailData['id']
    ];
}

/**
 * Salvar email no arquivo JSON
 */
function saveEmail($emailData) {
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $file = $dir . '/emails.json';
    $emails = [];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $emails = json_decode($content, true) ?: [];
    }
    
    $emails[] = $emailData;
    
    file_put_contents($file, json_encode($emails, JSON_PRETTY_PRINT));
}

/**
 * Log de eventos
 */
function logEvent($eventType, $data, $response) {
    $dir = __DIR__ . '/data';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $log = [
        'id' => uniqid(),
        'type' => 'event',
        'level' => 'info',
        'message' => "Event received: {$eventType}",
        'event_type' => $eventType,
        'data' => $data,
        'response' => $response,
        'created_date' => date('c'),
        'source' => 'remarketing-receive'
    ];
    
    $file = $dir . '/logs.json';
    $logs = [];
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $logs = json_decode($content, true) ?: [];
    }
    
    $logs[] = $log;
    
    // Manter apenas últimos 1000 logs
    if (count($logs) > 1000) {
        $logs = array_slice($logs, -1000);
    }
    
    file_put_contents($file, json_encode($logs, JSON_PRETTY_PRINT));
}

