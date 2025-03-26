<template>
  <div id="cesiumContainer"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, onUnmounted } from "vue";

// 配置Cesium的静态资源路径
window.CESIUM_BASE_URL = "/node_modules/cesium/Build/Cesium/";

// 配置Cesium的访问令牌
Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YmExZGIzNS04NWM5LTRkZjItOTViOC1jY2IwZDczMzQ5OWQiLCJpZCI6Mjg3MjIxLCJpYXQiOjE3NDI4MzI0MzR9.x5-Ml3CZHmvtcScoTZfSIp5Aq1lS89G8vSxvzEyn95w";
let viewer = null;
const metaData = ref({}); // 初始化Cesium Viewer
// 初始化Cesium Viewer
const initCesiumViewer = async () => {
  // 配置Viewer选项
  const viewerOptions = {
    imageryProvider: false, // 禁用默认的影像提供者

    // 基础配置
    baseLayerPicker: false, // 图层选择器
    timeline: false, // 时间轴
    animation: false, // 动画控件
    fullscreenButton: true, // 全屏按钮
    geocoder: false, // 地理编码器
    homeButton: false, // home按钮
    navigationHelpButton: false, // 帮助按钮
    sceneModePicker: false, // 场景模式选择器
    // scene3DOnly: true, // 仅显示3D场景
    shouldAnimate: true, // 启用动画
    // clock: new Cesium.Clock(), // 时钟
    // selectedImageryProviderViewModel: undefined, // 默认影像图层
    // selectedTerrainProviderViewModel: undefined, // 默认地形图层
    // imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), // 影像图层列表
    // terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), // 地形图层列表
    // 地形配置
    // terrainProvider: new Cesium.CesiumTerrainProvider({
    //   url: "/outLab3/terrS/{z}/{x}/{y}.terrain", // 替换为你的离线地形文件路径
    //   requestVertexNormals: true, // 启用顶点法线请求
    //   requestWaterMask: true, // 启用水掩码请求
    // }),
    // imageryProvider: new Cesium.WebMapServiceImageryProvider({
    //   url: "/outLab3/imageS/{z}/{x}/{y}.png",
    //   layers: "nurc:Arc_Sample", // Here just give layer name
    // }),
    // baseLayerPicker: false, // 底图切换控件
    terrainProvider: await Cesium.createWorldTerrainAsync({
      url: "/outLab3/terrS/{z}/{x}/{y}.terrain", // 替换为你的离线地形文件路径
      requestVertexNormals: true, // 启用顶点法线请求
      requestWaterMask: true, // 启用水掩码请求
    }), // 使用Cesium自带的全球地形
  };

  // 创建Viewer实例
  viewer = new Cesium.Viewer("cesiumContainer", viewerOptions);

  // 使用 meta.json 中的数据进行配置
  const { bounds, maxzoom, minzoom } = metaData.value;

  // 添加模型
  const modelEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(
      113.60314952490516,
      36.37382670085862
    ), // 模型的位置（与点相同）
    model: {
      uri: "/models/GroundVehicle/GroundVehicle.glb", // 模型文件的路径，需替换为实际路径
      // scale: 100.0, // 模型的缩放比例
      minimumPixelSize: 108, // 模型的最小像素大小
      maximumScale: 20000, // 模型的最大缩放比例
    },
  });
  // viewer.trackedEntity = modelEntity;
  //加载离线地图
  const offlineImageryProvider = new Cesium.UrlTemplateImageryProvider({
    url: "/outLab3/imageS/{z}/{x}/{y}.png", // 替换为你的瓦片地图路径
    fileExtension: "png", // 瓦片地图文件扩展名
    minimumLevel: minzoom,
    maximumLevel: maxzoom,
  });
  //  添加离线地图到 Viewer
  const layer = viewer.imageryLayers.addImageryProvider(offlineImageryProvider);

  // 计算矩形边界
  const rectangle = Cesium.Rectangle.fromDegrees(
    bounds.west,
    bounds.south,
    bounds.east,
    bounds.north
  );
  // 根据矩形边界计算相机的最大缩放距离
  const corner1 = Cesium.Cartesian3.fromDegrees(bounds.west, bounds.south);
  const corner2 = Cesium.Cartesian3.fromDegrees(bounds.east, bounds.north);
  const distance = Cesium.Cartesian3.distance(corner1, corner2);
  const maxZoomDistance = distance * 1; // 可以根据实际情况调整倍数

  // 设置相机视角
  viewer.camera.setView({
    destination: rectangle,
    orientation: {
      heading: 0.0, // 方向
      pitch: -Cesium.Math.toRadians(45), // 俯仰角
      roll: 0.0, // 旋转
    },
  });
  // 设置最大缩放级别
  viewer.scene.screenSpaceCameraController.maximumZoomDistance =
    maxZoomDistance;
  // 设置初始视角
  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(
  //     -123.0744619,
  //     44.0503706,
  //     150000
  //   ), // 北京上空
  //   orientation: {
  //     heading: 0.0,
  //     pitch: -Cesium.Math.PI_OVER_TWO,
  //     roll: 0.0,
  //   },
  // });

  // 启用大气层效果
  viewer.scene.skyAtmosphere.show = true;

  // 设置场景背景色
  viewer.scene.backgroundColor = Cesium.Color.BLACK;

  // 启用光照效果
  viewer.scene.globe.enableLighting = true;

  // 设置最大缩放级别
  // viewer.scene.screenSpaceCameraController.maximumZoomDistance = 20000000;

  // 设置最小缩放级别
  // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 1000;

  // 添加点
  // const pointEntity = viewer.entities.add({
  //   position: Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706), // 点的位置（北京）
  //   point: {
  //     color: Cesium.Color.RED, // 点的颜色
  //     pixelSize: 10, // 点的像素大小
  //     outlineColor: Cesium.Color.WHITE, // 点的轮廓颜色
  //     outlineWidth: 2, // 点的轮廓宽度
  //   },
  // });

  // viewer.camera.setView({
  //   destination: Cesium.Cartesian3.fromDegrees(36.35938, 113.5728, 1000), // 替换为瓦片地图所在区域的经纬度和高度
  //   orientation: {
  //     heading: 0.0,
  //     pitch: -Cesium.Math.PI_OVER_TWO,
  //     roll: 0.0,
  //   },
  // });
};

onMounted(async () => {
  const response = await fetch("/meta.json");
  metaData.value = await response.json();
  initCesiumViewer();
});

onUnmounted(() => {
  if (viewer) {
    viewer.destroy();
  }
});
</script>

<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

/* 自定义Cesium控件样式 */
:deep(.cesium-viewer-bottom) {
  display: none;
}

:deep(.cesium-viewer-toolbar) {
  top: 10px;
  right: 10px;
}
</style>
