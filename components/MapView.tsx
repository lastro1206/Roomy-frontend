// components/MapView.tsx
import { WebView } from "react-native-webview";

interface MapViewProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
}

export default function MapView({
  latitude = 37.5519,
  longitude = 127.0739,
  zoom = 16.4,
}: MapViewProps) {
  const HTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.EXPO_PUBLIC_NCP_KEY_ID}"></script>
</head>
<body>
<div id="map" style="width:100%;height:600px;"></div>

<script>
var mapOptions = {
    center: new naver.maps.LatLng(${latitude}, ${longitude}),
    zoom: ${zoom}
};
var map = new naver.maps.Map('map', mapOptions);
</script>
</body>
</html>
`;

  return (
    <WebView
      source={{ html: HTML, baseUrl: "http://localhost:8081" }}
      originWhitelist={["*"]}
      javaScriptEnabled
      domStorageEnabled
      style={{ flex: 1 }}
    />
  );
}
