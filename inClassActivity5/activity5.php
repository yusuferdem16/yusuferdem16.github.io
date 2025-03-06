<?php
// Define currency conversion rates in an associative array
// Rates are manually entered (as of March 2025 approximate values)
$exchangeRates = [
    'USD-USD' => 1.0,
    'USD-CAD' => 1.35,
    'USD-EUR' => 0.92,
    'CAD-USD' => 0.74,
    'CAD-CAD' => 1.0,
    'CAD-EUR' => 0.68,
    'EUR-USD' => 1.09,
    'EUR-CAD' => 1.47,
    'EUR-EUR' => 1.0
];

// Initialize variables
$amount = isset($_GET['amount']) ? $_GET['amount'] : '';
$fromCurrency = isset($_GET['fromCurrency']) ? $_GET['fromCurrency'] : 'USD';
$toCurrency = isset($_GET['toCurrency']) ? $_GET['toCurrency'] : 'USD';
$result = '';

// Process conversion if form is submitted
if (isset($_GET['convert'])) {
    $amount = floatval($_GET['amount']);
    $fromCurrency = $_GET['fromCurrency'];
    $toCurrency = $_GET['toCurrency'];

    $conversionKey = $fromCurrency . '-' . $toCurrency;
    if (array_key_exists($conversionKey, $exchangeRates)) {
        $result = number_format($amount * $exchangeRates[$conversionKey], 2);
    } else {
        $result = "Conversion rate not available";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Currency Calculation</title>
    <meta name="description" content="CENG 311 Inclass Activity 5" />
</head>
<body>
    <form method="GET">
        <table>
            <tr>
                <td>From:</td>
                <td><input type="text" name="amount" value="<?php echo htmlspecialchars($amount); ?>"/></td>
                <td>Currency:</td>
                <td>
                    <select name="fromCurrency">
                        <option value="USD" <?php echo $fromCurrency == 'USD' ? 'selected' : ''; ?>>USD</option>
                        <option value="CAD" <?php echo $fromCurrency == 'CAD' ? 'selected' : ''; ?>>CAD</option>
                        <option value="EUR" <?php echo $fromCurrency == 'EUR' ? 'selected' : ''; ?>>EUR</option>
                    </select>
                </td>    
            </tr>
            <tr>
                <td>To:</td>
                <td><input type="text" name="result" value="<?php echo htmlspecialchars($result); ?>" readonly/></td>
                <td>Currency:</td>
                <td>
                    <select name="toCurrency">
                        <option value="USD" <?php echo $toCurrency == 'USD' ? 'selected' : ''; ?>>USD</option>
                        <option value="CAD" <?php echo $toCurrency == 'CAD' ? 'selected' : ''; ?>>CAD</option>
                        <option value="EUR" <?php echo $toCurrency == 'EUR' ? 'selected' : ''; ?>>EUR</option>
                    </select>
                </td>    
            </tr>
            <tr>
                <td colspan="3"></td>
                <td><input type="submit" name="convert" value="Convert"/></td>    
            </tr>
        </table>
    </form>        
</body>
</html>