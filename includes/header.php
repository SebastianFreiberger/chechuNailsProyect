<!-- Header -->
<header class="header">
    <div class="container">
        <a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#inicio" class="logo">
            <img src="<?php echo isset($basePath) ? $basePath : ''; ?>images/logoChechuñas.png" alt="ChechUñas Logo">
            <div class="logo-text">
                <h2>ChechUñas</h2>
                <span>Nail Art Studio</span>
            </div>
        </a>
        
        <nav>
            <ul class="nav-menu">
                <li><a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#inicio">Inicio</a></li>
                <li><a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#servicios">Servicios</a></li>
                <li><a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#galeria">Galería</a></li>
                <li><a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#nosotros">Nosotros</a></li>
                <li><a href="<?php echo isset($basePath) ? $basePath : ''; ?>index.php#contacto">Contacto</a></li>
            </ul>
        </nav>
        
        <button class="mobile-menu-btn" aria-label="Abrir menú">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>
</header>
