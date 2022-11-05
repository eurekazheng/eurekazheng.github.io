// 百度地图API功能
const map = new BMap.Map("allmap");
const center = new BMap.Point(116.723059, 23.366803);
map.centerAndZoom(center, 15);
map.enableScrollWheelZoom();
map.enableInertialDragging();
map.enableContinuousZoom();
map.enableKeyboard();

fetch("./coordinates.json")
  .then((res) => {
    return res.json();
  })
  .then((sites) => {
    for (const site of sites) {
      const point = new BMap.Point(site["lng"], site["lat"]);
      const marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      const opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: `<b>${site["name"]}</b>`, // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~",
      };
      const infoWindow = new BMap.InfoWindow(site["address"], opts); // 创建信息窗口对象
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    }
  });
