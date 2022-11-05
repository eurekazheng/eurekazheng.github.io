// 百度地图API功能
const map = new BMapGL.Map("container");
const center = new BMapGL.Point(116.723059, 23.366803);
map.centerAndZoom(center, 15);
map.enableScrollWheelZoom();
map.enableInertialDragging();
map.enableContinuousZoom();
map.enableKeyboard();
// map.disableDragging();

fetch("./coordinates.json")
  .then((res) => {
    return res.json();
  })
  .then((sites) => {
    for (const site of sites) {
      const point = new BMapGL.Point(site["lng"], site["lat"]);
      const marker = new BMapGL.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      const opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: `<b>${site["name"]}</b>`, // 信息窗口标题
        enableCloseOnClick: false,
      };
      const infoWindow = new BMapGL.InfoWindow(
        `${site["address"]}<br><button id="redirect-btn">跳转百度地图打开</button>`,
        opts
      ); // 创建信息窗口对象
      infoWindow.addEventListener("open", function () {
        if (
          navigator.userAgent.match(
            /(iPhone|iPod|Android|ios|iOS|iPad|WebOS|Symbian|Windows Phone|Phone)/i
          )
        ) {
          document
            .getElementById("redirect-btn")
            .addEventListener("touchstart", () => {
              window.location.href = `baidumap://map/marker?location=${site["lat"]},${site["lng"]}&title=${site["name"]}&content=${site["address"]}&src=ios.baidu.openAPIdemo`;
            });
        } else {
          document
            .getElementById("redirect-btn")
            .addEventListener("click", () => {
              window.open(
                `https://api.map.baidu.com/marker?location=${site["lat"]},${site["lng"]}&title=${site["name"]}&content=${site["address"]}&output=html`,
                "_blank"
              );
            });
        }
      });
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    }
  });
