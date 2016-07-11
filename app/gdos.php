<?php

function url_get_contents ($Url) {
    if (!function_exists('curl_init')){
        die('CURL is not installed!');
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $Url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $output = curl_exec($ch);
    curl_close($ch);
    return $output;
}

$x = $_GET['x'];
$y = $_GET['y'];

$url = "http://geoserwis.gdos.gov.pl/mapy/FeatureManager/GetUsrInfo?_dc=1468169863278&server=http%3A%2F%2Fsdi.gdos.gov.pl%2Fwms&layers=PomnikiPrzyrody%2CRezerwaty%2CParkiKrajobrazowe%2CParkiNarodowe%2CZespolyPrzyrodniczoKrajobrazowe%2CObszarySpecjalnejOchrony%2CSpecjalneObszaryOchrony&styles=pp%241%243%2Crez%241%243%2Cpk%241%243%2Cpn%241%243%2Czespoly%241%243%2Coso%241%243%2Csoo%241%243&names=Pomniki%20Przyrody%2CRezerwaty%3Cspan%20style%3D%22color%3Ared%22%3E*%3C%2Fspan%3E%2CParki%20Krajobrazowe%3Cspan%20style%3D%22color%3Ared%22%3E*%3C%2Fspan%3E%2CParki%20Narodowe%3Cspan%20style%3D%22color%3Ared%22%3E*%3C%2Fspan%3E%2CZespo%26%23x0142%3By%20Przyrodniczo-Krajobrazowe%3Cspan%20style%3D%22color%3Ared%22%3E*%3C%2Fspan%3E%2CNatura%202000%20-%20obszary%20ptasie%2CNatura%202000%20-%20obszary%20siedliskowe&u_server=&u_layers=&u_styles=&u_names=&x=".$x."&y=".$y."&crs=EPSG%3A2180&buffer=8.00";
echo url_get_contents($url);
