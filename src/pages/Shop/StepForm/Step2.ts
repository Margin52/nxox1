import React from 'react';

// 定义 Map 的 类型
declare class GaoDeAMap {
  constructor(container: HTMLElement, option: { center: [number, number]; zoom: number });
  public destroy(): void;
}

// 定义全局的 AMap
declare const AMap: {
  Map: typeof GaoDeAMap;
};

// tslint:disable-next-line:max-classes-per-file
class MapComponent extends React.Component {
  public mapDom: HTMLDivElement;
  public map: GaoDeAMap;
  public componentDidMount() {
    const map = new AMap.Map(this.mapDom, {
      center: [117.000923, 36.675807],
      zoom: 11,
    });
    this.map = map;
  }
  public componentWillUnmount() {
    this.map.destroy();
  }
  public render() {
    return <div ref={ref => (this.mapDom = ref)} />;
  }
}

export default MapComponent;

