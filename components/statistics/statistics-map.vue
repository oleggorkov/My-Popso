<template>
	<div class="statistics-map">
    <client-only>
      <l-map ref="map" :zoom="MapOptions.zoom" :center="MapOptions.center">
        <l-tile-layer :url="MapOptions.url" />
        <l-marker v-for="(item, index) in MapOptions.GeoJson" :lat-lng="item.RegionCenter"
                  :key="`tooltip-index-${index}`" :icon="defaultIcon">
          {{ item.ItemsSold.all }}
          <l-tooltip>
            <div class="map-tooltip">
              <p class="map-tooltip__title">{{ item.region }}</p>
              <ul class="map-tooltip__text">
                <li v-if="item.ItemsSold.ozon > 0">OZON <span>{{ item.ItemsSold.ozon.toLocaleString('ru-RU') }}</span></li>
                <li v-if="item.ItemsSold.wildberries > 0">Wildberries<span>{{ item.ItemsSold.wildberries.toLocaleString('ru-RU') }}</span></li>
              </ul>
            </div>
          </l-tooltip>
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>

<script>
  import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet';
  import 'leaflet/dist/leaflet.css';

  import image from '../../assets/images/icons/map-circle.svg'

  export default {
    name: 'statistics-map',
    components: { LMap, LTileLayer, LMarker, LTooltip },
    data: () => {
      return {
        MapOptions: {
          zoom: 4,
          center: [55.7522, 37.6156],
          url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          GeoJson: [
            {
              region: 'Алтайский край',
              RegionCenter: [52.5, 83.0],
              ItemsSold: {
                all: 275,
                ozon: 200,
                wildberries: 75,
              },
            },
            {
              region: 'Москва',
              RegionCenter: [55.7522, 37.6156],
              ItemsSold: {
                all: 45475,
                ozon: 32200,
                wildberries: 13275,
              },
            },
          ],
        },
      }
    },
    computed: {
      defaultIcon(){
        return L.icon({
          iconUrl: image,
          shadowUrl: image,
          iconSize:     [32, 32],
          shadowSize:   [40, 40],
          iconAnchor:   [16, 16],
          shadowAnchor: [20, 20],
          popupAnchor:  [0, 0]
        })
      }
    },
  }
</script>

<style lang="scss">
  .statistics-map{
    width: 100%;
    height: 100%;

    display: block;
    overflow: hidden;

    *{
      font-size: 2rem;
    }
  }

  .map-tooltip{
    width: 100%;
    height: 100%;

    min-width: 15rem;

    padding: 0.4rem;

    display: block;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex-shrink: 0;
    flex-grow: 1;

    &__title{
      width: 100%;
      height: auto;

      padding-bottom: 0.4rem;

      font-size: 1.2rem;
      line-height: 1.6rem;
      color: $color-main--black;
      font-weight: normal;

      border-bottom: 0.1rem solid $color-main--lightgray;
    }

    &__text{
      width: 100%;
      height: auto;

      margin-top: 0.8rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      li{
        width: 100%;
        height: auto;

        display: flex;
        justify-content: space-between;
        align-items: center;

        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: bold;

        span{
          font-size: inherit;
          line-height: inherit;
          font-weight: inherit;
          color: inherit;
        }

        &:not(:first-of-type){
          margin-top: 0.4rem;
        }

        &:nth-of-type(1){
          color: $color-main--blue;
        }

        &:nth-of-type(2){
          color: $color-main--purple;
        }
      }
    }
  }

  .leaflet-tile-container{
    filter: grayscale(1);
  }

  .leaflet-control-attribution{
    display: none;
  }
</style>
