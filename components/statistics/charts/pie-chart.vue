<template>
  <div class="pie-chart">
    <div class="pie-chart__content">
      <canvas ref="pie-chart"/>
    </div>
     <div class="pie-chart-text" ref="pie-chart-text">
      <p>{{ TextBlockTitle.toLocaleString('ru-RU') }} {{ HelperText }}</p>
      <p>{{ TextBlockHelperText }}</p>
    </div>
    <div class="pie-chart-description">
      <div class="pie-chart-description-item" v-for="field in fields">
        <p class="pie-chart-description-item__value">{{ field.value.toLocaleString('ru-RU') }} {{HelperText}}</p>
        <p class="pie-chart-description-item__title">{{ field.title }}</p>
        <div class="pie-chart-description-item__line">
          <span :style="{width: `${field.PercentageValue}%`}"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "pie-chart",
    props: {
      categories: Array,
      HelperText: String,
    },
    data: () => {
      return {
        canvas: null,
        ctx: null,
        TextBlock: null,
        TextBlockTitle: '',
        TextBlockHelperText: 'Максимальные продажи',
        PieContentHeight: null,
        DescriptionContentHeight: null,
        DescriptionBlockHeight: null,
        DescriptionBlockWidth: null,
        DescriptionBlockGap: null,
        ChartRadius: null,
        MaxValue: null,
        MinValue: null,
      }
    },
    mounted() {
      this.canvas = this.$refs['pie-chart'];
      this.ctx = this.canvas.getContext('2d');

      this.CalcChartOptions();

      this.RenderChart();

      window.addEventListener('resize', this.CalcChartOptions);
      window.addEventListener('resize', this.RenderChart);

      this.canvas.addEventListener('mousemove', e => {
        const dx = e.offsetX  - (this.canvas.width / 2);
        const dy = e.offsetY  - (this.canvas.height / 2);
        const d = Math.sqrt((dx * dx) + (dy * dy));

        let angle = Math.atan2(dy,dx);

        if (angle < 0){
          angle += 2 * Math.PI
        }

        if (d <= this.ChartRadius){
          this.fields.forEach((el, index) => {
            if (angle > this.ConvertAngle(this.CalcStartAngle(this.fields, index)) && angle < this.ConvertAngle(this.CalcEndAngle(this.fields, index))){
              this.CalcChartOptions();
              this.RenderChart();
              this.RenderHelperCircle(index, angle);

              if (el.value === this.MaxValue) {
                this.TextBlockHelperText = 'Максимальные продажи';
              }

              if (el.value === this.MinValue) {
                this.TextBlockHelperText = 'Минимальные продажи';
              }

              if (el.value !== this.MaxValue && el.value !== this.MinValue){
                this.TextBlockHelperText = '';
              }

              this.TextBlockTitle = el.value;
            }
          });
        }
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.CalcChartOptions);
      window.removeEventListener('resize', this.RenderChart);
    },
    methods: {
      CalcChartOptions(){
        this.TextBlock = this.$refs['pie-chart-text'];

        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;

        this.ChartRadius = (this.canvas.height / 2) - ((this.canvas.height / 100) * 5);

        this.TextBlockTitle = this.fields.map(el => el.value).reduce((a, b) => {
          if (a > b) {
            return a
          } else {
            return  b
          }
        }, 0);

        this.MaxValue = this.fields.map(el => el.value).reduce((a, b) => {
          if (a > b) {
            return a
          } else {
            return  b
          }
        });

        this.MinValue = this.fields.map(el => el.value).reduce((a, b) => {
          if (a < b) {
            return a
          } else {
            return  b
          }
        });
      },
      RenderChart(){
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.lineWidth = 3;

        this.fields.forEach((el, index) => {
          this.ctx.beginPath();

          this.ctx.strokeStyle = this.GetFillColor(index);

          this.ctx.arc(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.ChartRadius,
            this.ConvertAngle(this.CalcStartAngle(this.fields, index)),
            this.ConvertAngle(this.CalcEndAngle(this.fields, index))
          );

          this.ctx.stroke();
        });

        this.TextBlock.style.left = `${this.canvas.width / 2}px`;
        this.TextBlock.style.top = `${this.canvas.height / 2}px`;
      },
      RenderHelperCircle(index, angle){
        this.ctx.beginPath();
        this.ctx.fillStyle = '#FFF';
        this.ctx.strokeStyle = this.GetFillColor(index);

        this.ctx.arc(
          this.canvas.width / 2 + (this.ChartRadius * Math.cos(angle)),
          this.canvas.height / 2 + (this.ChartRadius * Math.sin(angle)),
          this.ChartRadius / 10,
          0,
          25
        );

        this.ctx.fill();
        this.ctx.stroke();
      },
      ConvertAngle(value){
        return ((2 * Math.PI) / 100) * value;
      },
      CalcStartAngle(arr, id){
        return arr.reduce((a, b, index) => {
          return index < id ? a += b.PercentageValue : a;
        }, 0);
      },
      CalcEndAngle(arr, id){
        return arr.reduce((a, b, index) => {
          return index <= id ? a += b.PercentageValue : a;
        }, 0);
      },
      GetFillColor(index){
        let color = '#000';

        if ((index + 1) % 1 === 0){
          color = '#BD0D22';
        }

        if ((index + 1) % 2 === 0){
          color = '#EEB969';
        }

        if ((index + 1) % 3 === 0){
          color = '#6FBC9A';
        }

        return color;
      },
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
      }),
      fields(){
        let sum = this.categories.reduce((a, b) =>  { return a += b.value }, 0);

        if (sum > 100){
          this.categories.forEach(el => {
            el['PercentageValue'] = el.value / (sum / 100);
          });
        } else {
          this.categories.forEach(el => {
            el['PercentageValue'] = el.value;
          })
        }

        return this.categories
      },
    },
    watch: {
      SidebarState(){
        let timerId = setInterval(() => {
          this.CalcChartOptions();
          this.RenderChart();
        },5);

        setTimeout(() => {
          clearInterval(timerId);
        },350);
      },
      fields: {
        handler(){
          this.CalcChartOptions();
          this.RenderChart();
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss">
  .pie-chart{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    position: relative;

    &__content{
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }

  .pie-chart-text{
    width: auto;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    position: absolute;
    pointer-events: none;

    p{
      text-align: center;

      &:nth-of-type(1){
        font-size: 3.2rem;
        line-height: 4rem;
        font-weight: 500;
        color: $color-main--red;
      }
      &:nth-of-type(2){
        max-width: 10rem;

        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
        color: $color-main--darkgray
      }
    }

    transform: translateX(-50%) translateY(-50%);
  }

  .pie-chart-description{
    width: 100%;
    height: auto;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 4rem;
    grid-row-gap: 1.6rem;
  }

  .pie-chart-description-item{
    width: 100%;
    height: auto;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;

    &__value{
      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--darkgray;
    }

    &__title{
      font-size: 1.2rem;
      line-height: 1.6rem;
      font-weight: 500;
      color: $color-main--darkgray;
      text-decoration: none;

      cursor: pointer;

      &:hover{
        color: $color-main--orange;
        text-decoration: underline;
      }
    }

    &__line{
      width: 100%;
      height: 0.2rem;

      margin-top: 0.8rem;

      display: flex;
      justify-content: flex-start;
      align-items: center;

      background-color: $color-main--lightgray;
      border-radius: 0.1rem;

      span{
        height: inherit;
      }
    }

    &:nth-of-type(3n - 2){
      .pie-chart-description-item__line{
        span{
          background-color: $color-main--red;
        }
      }
    }

    &:nth-of-type(3n - 1){
      .pie-chart-description-item__line{
        span{
         background-color: $color-main--orange;
        }
      }
    }

    &:nth-of-type(3n){
      .pie-chart-description-item__line{
        span{
         background-color: $color-main--green;
        }
      }
    }
  }
</style>
