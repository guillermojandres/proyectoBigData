<?php 
# Cargamos la librería dompdf.
require_once 'dompdf_config.inc.php';
 
# Contenido HTML del documento que queremos generar en PDF.
$html='
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Ejemplo de Documento en PDF.</title>
</head>
<body>
 
<h2>Ingredientes para la realización de Postres.</h2>
<p>Ingredientes:</p>
<table border=1 width="100%">
	<tr>
		<td>Que paso</td>
	</tr>
</table>
</body>
</html>';
 
# Instanciamos un objeto de la clase DOMPDF.
$mipdf = new DOMPDF();
 
# Definimos el tamaño y orientación del papel que queremos.
# O por defecto cogerá el que está en el fichero de configuración.
$mipdf ->set_paper("A4", "portrait");
 
# Cargamos el contenido HTML.
$mipdf ->load_html(utf8_decode($html));
 
# Renderizamos el documento PDF.
$mipdf ->render();
 
# Enviamos el fichero PDF al navegador.
$mipdf ->stream('FicheroEjemplo.pdf' ,array("Attachment" => 0));
?>