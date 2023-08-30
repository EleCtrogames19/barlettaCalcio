<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link href="../style.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
body {
	background-image: url(../images/info_script.gif);
	background-repeat: no-repeat;
}
-->
</style><body oncontextmenu="return false" onselectstart="return false" ondragstart="return false">
<meta http-equiv="imagetoolbar" content="no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<table width="187" border="0" align="left" cellpadding="0" cellspacing="0" class="classifica">
  
  <tr>
    <th width="199" scope="row"><div align="center" class="green">ALCUNE TUE INFORMAZIONI</div></th>
  </tr>
  <tr>
    <td class="main" scope="row"><div align="left"><?php echo "Il tuo IP: $REMOTE_ADDR"; ?>&nbsp;</div></td>
  </tr>
  
  <tr>
    <td class="main" scope="row"><div align="left"><?php echo "Lingua broswer: $HTTP_ACCEPT_LANGUAGE"; ?>&nbsp;</div></td>
  </tr>
  <tr>
    <td class="red" scope="row"><div align="center"><strong>Il tuo Host</strong></div></td>
  </tr>
  <tr>
    <td class="classifica" scope="row"><div align="left" class="main"><? 
	$ip = $REMOTE_ADDR; 
$host = gethostbyaddr($ip); 
echo $host; 
?>&nbsp;</div></td>
  </tr>
</table>
</body>
</html>
