<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo isset($pageDescription) ? $pageDescription : 'ChechUñas - Salón especializado en el arte de embellecer tus uñas. Manicuras, pedicuras, diseños personalizados y tendencias modernas.'; ?>">
    <meta name="keywords" content="uñas, manicure, pedicure, nail art, diseño de uñas, belleza">
    <meta name="author" content="ChechUñas">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?php echo isset($basePath) ? $basePath : ''; ?>images/logoChechuñas.png">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="<?php echo isset($basePath) ? $basePath : ''; ?>css/variables.css">
    <link rel="stylesheet" href="<?php echo isset($basePath) ? $basePath : ''; ?>css/base.css">
    <link rel="stylesheet" href="<?php echo isset($basePath) ? $basePath : ''; ?>css/components.css">
    <link rel="stylesheet" href="<?php echo isset($basePath) ? $basePath : ''; ?>css/responsive.css">
    <?php if (isset($extraCss)): ?>
    <link rel="stylesheet" href="<?php echo isset($basePath) ? $basePath : ''; ?><?php echo $extraCss; ?>">
    <?php endif; ?>

    <title><?php echo isset($pageTitle) ? $pageTitle . ' | ChechUñas' : 'ChechUñas | Salón de Uñas Profesional'; ?></title>
</head>
<body>
    <!-- Loader -->
    <div class="loader">
        <div class="loader-spinner"></div>
    </div>
