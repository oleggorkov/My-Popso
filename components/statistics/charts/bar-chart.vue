<template>
	<div class="bar-chart">
    <canvas ref="bar-chart"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import * as FontFaceObserver from 'fontfaceobserver';

  export default {
    name: "bar-chart",
    data: () => {
      return {
        canvas: null,
        ctx: null,
        RowHeight: null,
        RowWidth: null,
        MaxRowLength: null,
        data: {
          AllProducts: {
            title: 'Всего товаров',
            value: 1250
          },
          AwaitingShipment: {
            title: 'Ожидают отгрузки',
            value: 250
          },
          DeliveredComing: {
            title: 'Доставляются',
            value: 500
          },
          Delivered: {
            title: 'Доставлены',
            value: 450
          },
          Closed: {
            title: 'Отменены',
            value: 50,
          },
        }
      }
    },
    async mounted() {
      await new FontFaceObserver('Montserrat');

      this.canvas = this.$refs['bar-chart'];
      this.ctx = this.canvas.getContext('2d');

      this.CalcChartOptions();

      this.RenderChart();

      window.addEventListener('resize', this.CalcChartOptions);
      window.addEventListener('resize', this.RenderChart);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.CalcChartOptions);
      window.removeEventListener('resize', this.RenderChart);
    },
    methods: {
      CalcChartOptions(){
        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;

        this.RowHeight = this.canvas.height / Object.keys(this.data).length;
        this.RowWidth = this.canvas.width;
        this.MaxRowLength = this.data.AllProducts.value;
      },
      RenderRow(data, index){
        this.ctx.fillStyle = '#EFF1F9';
        this.ctx.fillRect(0, this.RowHeight * (index + 1) - 2, this.RowWidth, 2);

        this.ctx.textAlign = 'left';
        this.ctx.font = '500 12px Montserrat';
        this.ctx.fillStyle = '#6F849C';

        this.ctx.fillText(data.title, 0, this.RowHeight * (index + 1) - 8 - 2);

        this.ctx.textAlign = 'right';
        this.ctx.font = '700 12px Montserrat';
        this.ctx.fillStyle = '#303136';

        this.ctx.fillText(data.value, this.RowWidth, this.RowHeight * (index + 1) - 8);
      },
      FillRow(data, index, options){
        this.ctx.fillStyle = options.FillColor;
        this.ctx.fillRect((this.RowWidth / this.MaxRowLength) * options.StartPosition, this.RowHeight * (index + 1) - 2, (this.RowWidth / this.MaxRowLength) * data.value, 2);
      },
      RenderChart(){
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);

        this.RenderRow(this.data.AllProducts, 0);
        this.FillRow(this.data.AwaitingShipment, 0, { FillColor: '#EEB969', StartPosition: 0 });
        this.FillRow(this.data.DeliveredComing, 0, { FillColor: '#6F849C', StartPosition: this.data.AwaitingShipment.value });
        this.FillRow(this.data.Delivered, 0, { FillColor: '#6FBC9A', StartPosition: this.data.DeliveredComing.value + this.data.AwaitingShipment.value });
        this.FillRow(this.data.Closed, 0, { FillColor: '#BD0D22', StartPosition: this.data.Delivered.value + this.data.DeliveredComing.value + this.data.AwaitingShipment.value  });

        this.RenderRow(this.data.AwaitingShipment, 1);
        this.FillRow(this.data.AwaitingShipment, 1, { FillColor: '#EEB969', StartPosition: 0 });
        this.RenderRow(this.data.DeliveredComing, 2);
        this.FillRow(this.data.DeliveredComing, 2, { FillColor: '#6F849C', StartPosition: 0 });
        this.RenderRow(this.data.Delivered, 3);
        this.FillRow(this.data.Delivered, 3, { FillColor: '#6FBC9A', StartPosition: 0 });
        this.RenderRow(this.data.Closed, 4);
        this.FillRow(this.data.Closed, 4, { FillColor: '#BD0D22', StartPosition: 0 });
      },
      RenderAnimatedChart(){
        const AnimateDot = (key) => {
          const OldValue = this.data[key].value;
          const scale = 50;

          this.data[key].value = 0;

          let tick = () => {
            this.data[key].value += Math.floor(OldValue / scale);

            this.RenderChart();

            if (this.data[key].value >= OldValue){
              cancelAnimationFrame(tick);
            } else {
              requestAnimationFrame(tick)
            }
          };

          requestAnimationFrame(tick);
        };

        AnimateDot('AwaitingShipment');
        AnimateDot('DeliveredComing');
        AnimateDot('Delivered');
        AnimateDot('Closed');
      }
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
      }),
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
      }
    }
  }
</script>

<style lang="scss">
  .bar-chart{
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-shrink: 0;

    position: relative;
  }
</style>
