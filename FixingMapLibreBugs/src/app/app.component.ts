import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import maplibregl, { ImageSource, Map as Maplibre } from '../../../../maplibre-gl-js/dist/maplibre-gl'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FixingMapLibreBugs';
  #map!: Maplibre;


  constructor() {
    
  }
  // #mouseCoordinates = new BehaviorSubject<TemplateRef<unknown> | undefined>(undefined);
  // @ViewChild('info', { static: true })
  // public set info(value: TemplateRef<unknown>) {
  //   this.#mouseCoordinates.next(value)
  // }

  ngOnInit(): void {
    this.#map = new maplibregl.Map({
      container: 'map',
      zoom: 12,
      center: [11.39085, 47.27574],
      pitch: 52,
      hash: true,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19
          },
          // Use a different source for terrain and hillshade layers, to improve render quality
          terrainSource: {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256
          },
          hillshadeSource: {
            type: 'raster-dem',
            url: 'https://demotiles.maplibre.org/terrain-tiles/tiles.json',
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm'
          },
          {
            id: 'hills',
            type: 'hillshade',
            source: 'hillshadeSource',
            layout: { visibility: 'visible' },
            paint: { 'hillshade-shadow-color': '#473B24' }
          }
        ],
        terrain: {
          source: 'terrainSource',
          exaggeration: 2
        }
      },
      maxZoom: 22,
      maxPitch: 85
    });
    // this.#map._showOverdrawInspector = true;
    this.#map.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showZoom: true,
        showCompass: true
      }),
      'top-right'
    );
    this.#map.addControl(
      new maplibregl.TerrainControl({
        source: 'terrainSource',
        exaggeration: 2
      }),
      'top-right'
    );
    
    this.#map.on('zoom', () => {
      console.log(this.#map.getZoom());
      
      const features = this.#map.style.getSource('image-dog');
      const features2 = this.#map.style.getSource('SOURCE-image-2');
      // if (features){
        // console.log(features, ':  feature one');
        // console.log(features2, ':  feature two');
      // } else {
      //   console.log('nothing');
      // }
    });
    // this.#map.on('mousemove', (e) => {
    //   `${JSON.stringify(e.point)
    //   }<br />${
    //       // e.lngLat is the longitude, latitude geographical position of the event
    //       JSON.stringify(e.lngLat.wrap())}`;
    // });

    const center = [11.39085, 47.27574];
    var image_offset = 0.61
    var la_t_tile_2 = center[1] + 0.035;
    var lo_l_tile_2 = center[0] - 0.055 + image_offset;
    var la_b_tile_2 = center[1] - 0.035;
    var lo_r_tile_2 = center[0] + 0.055 + image_offset;
    var url = 'https://i.imgur.com/3IyX7CK.png'

    this.#map.on('render', () => {
      // this.#map.updateImage;
      // const maxTileCacheZoomLevels = this.#map.getBounds;
      // console.log({maxTileCacheZoomLevels});
    });
    this.#map.on('load', () => {
      
      this.#map._showTileBoundaries = true;
      // this.#map.showCollisionBoxes = true;
      // this.#map.showPadding = true;
      // this.#map.showOverdrawInspector = true;
      this.#map.addSource('SOURCE-image-2', {
        type: 'image',
        url: '../assets/dog.jpg',
        coordinates: [
          [lo_l_tile_2, la_t_tile_2],
          [lo_r_tile_2, la_t_tile_2],
          [lo_r_tile_2, la_b_tile_2],
          [lo_l_tile_2, la_b_tile_2]
        ]
      });
      
      this.#map.addLayer({
        'id': 'SOURCE-image-2',
        'type': 'raster',
        'source': 'SOURCE-image-2',
      });

      let sources = this.#map.style.getSource('SOURCE-image-2');
      console.log({sources});
      for (let x = 0; x < 4; x++) {
        sources = this.#map.style.getSource('SOURCE-image-2' + x);
        console.log({sources});
      }

      this.#map.addLayer({
      id: 'image-dog',
      type: 'raster',
      source: {
        type: 'image',
        url: '../assets/dog.jpg',
        // 47.26338813315704, 11.253433227539062
        coordinates: [[10.89001, 47.360242], [11.55261894, 47.360242], [11.55261894, 47.2633], [10.89001, 47.2633]]
      }
    })
    const layers = this.#map.getLayersOrder();
    console.log({layers});
    let testLayer = this.#map.getLayer('SOURCE-image-20');
    console.log(testLayer);
    testLayer = this.#map.getLayer('SOURCE-image-2');
    console.log(testLayer);
  });
  // this.#map.on('zoom', () => {
  //   const layers = this.#map.getLayersOrder();
  //   console.log({layers});
  //   let testLayer = this.#map.getLayer('SOURCE-image-21');
  //   console.log(testLayer);
  //   testLayer = this.#map.getLayer('image-dog');
  //   console.log(testLayer);
  // })
    // let source2 = this.#map.getSource('SOURCE-image-2');
    // if (source2){
    //   let i = 0.0;
    //   let timer = window.setInterval(function () {
    //     let x = Math.cos(i) * 0.01
    //     let y = Math.sin(i) * 0.01
    //     source2 = ([
    //       [lo_l_tile_2 + x, la_t_tile_2 + y],
    //       [lo_r_tile_2 + x, la_t_tile_2 + y],
    //       [lo_r_tile_2 + x, la_b_tile_2 + y],
    //       [lo_l_tile_2 + x, la_b_tile_2 + y]
    //     ])
    //     i += 0.05;
    //   }, 25);
    // }
  }
  
  
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
