<template>
	<div class="line-chart">
    <canvas ref="line-chart" @mousemove="MoveChartPopup($event)" @mouseenter="ChartPopup.state = true" @mouseleave="ChartPopup.state = false"/>

    <div class="chart-popup" v-if="ChartPopup.state" :style="ChartPopup.MainContainerStyleObject">
      <div class="chart-popup__content" :style="ChartPopup.ContentContainerStyleObject">
        <p>{{ ChartPopup.text }}</p>
        <p>{{ ChartPopup.date }}</p>
      </div>
      <div class="chart-popup__dot" :style="ChartPopup.DotStyleObject"/>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: "custom-line-chart",
    props: ['HelperText','date'],
    data: () => {
      return {
        canvas: null,
        ctx: null,
        data: {
          AxisXCords: [],
          AxisYCords: [],
        },
        columns: [],
        ColumnWidth: null,
        FooterHeight: 32,
        AsideWidth: 10,
        AsideWidthTransform: null,
        AxisYTextLabels: [],
        ChartPopup: {
          text: '',
          date: '',
          position: 0,
          state: false,
          MainContainerStyleObject: {},
          ContentContainerStyleObject: {},
          DotStyleObject: {}
        }
      }
    },
    async mounted() {
      this.canvas = this.$refs['line-chart'];
      this.ctx = this.canvas.getContext('2d');

      await this.CalcChartOptions();

      //this.CreateOverlay();

      this.RenderChart();

      this.CalcChartPopupOptions();

      window.addEventListener('resize', this.CalcChartOptions);
      window.addEventListener('resize', this.RenderChart);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.CalcChartOptions);
      window.removeEventListener('resize', this.RenderChart);
    },
    methods: {
      CalcCordsX(cord){
        let value = 0;

        value = ((this.canvas.width - this.AsideWidthTransform) / this.data.AxisYCords.length) * cord;
        value += this.AsideWidthTransform;
        value += this.ColumnWidth / 2;

        return value;
      },
      CalcCordsY(cord){
        let value = 0;

        value = (this.canvas.height - this.FooterHeight);
        value -= (((this.canvas.height - this.FooterHeight) / this.AxisYTextLabels[0]) * cord);

        return value;
      },
      CalcChartOptions(){
        this.canvas.width = this.canvas.parentNode.offsetWidth;
        this.canvas.height = this.canvas.parentNode.offsetHeight;

        this.AxisYTextLabels = [];
        this.data.AxisXCords = [];
        this.data.AxisYCords = [];
        this.columns = [];

        for (let i = 0; i < this.days; i++){
          this.data.AxisYCords.push(Math.round(15000 - 0.5 + Math.random() * (25000 - 10000 + 1)));
          this.data.AxisXCords.push(i + 1);
        }

        for (let i = 6; i >= 0; i--){
          this.AxisYTextLabels.push(Math.floor((Math.max.apply(null, this.data.AxisYCords) / 5) * i));
        }

        this.AsideWidthTransform = ((this.canvas.width / 100) * this.AsideWidth);

        this.ColumnWidth = (this.canvas.width - this.AsideWidthTransform) / this.data.AxisYCords.length;

        for (let i = 0; i < this.data.AxisYCords.length; i++){
          this.columns.push([
            this.AsideWidthTransform + (this.ColumnWidth * i),
            this.AsideWidthTransform + (this.ColumnWidth * (i + 1)),
          ]);
        }

      },
      RenderChart(){
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        this.ctx.font = '500 12px Montserrat';

        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'bottom';

        this.AxisYTextLabels.forEach(el => {
          const RowHeight = (this.canvas.height - this.FooterHeight) / this.AxisYTextLabels.length;

          this.ctx.fillStyle = '#6F849C';
          this.ctx.fillText(`${el.toString()} ${this.HelperText}`, 0, this.CalcCordsY(el) - 2 - ((RowHeight / 100) * this.AsideWidth));
        });

        this.ctx.textBaseline = 'bottom';

        this.ctx.textAlign = 'left';
        this.ctx.fillText(this.date[0], this.AsideWidthTransform, this.canvas.height);

        this.ctx.textAlign = 'right';
        this.ctx.fillText(this.date[1], this.canvas.width, this.canvas.height);

        this.AxisYTextLabels.forEach(el => {
          this.ctx.fillStyle = '#EFF1F9';
          this.ctx.fillRect(0, this.CalcCordsY(el), this.canvas.width,2);
        });

        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.CalcCordsX(0), this.CalcCordsY(this.data.AxisYCords[0]));

        this.ctx.strokeStyle = '#6FBC9A';

        this.data.AxisYCords.forEach((el, index) => {
          this.ctx.lineTo(this.CalcCordsX(index), this.CalcCordsY(el));
        });

        this.ctx.stroke();
      },
      CalcChartPopupOptions(){
        this.$set(this.ChartPopup.MainContainerStyleObject, 'width', `${parseInt(this.ColumnWidth)}px`);
        this.$set(this.ChartPopup.MainContainerStyleObject, 'height', `${this.canvas.height}px`);
        this.$set(this.ChartPopup.MainContainerStyleObject, 'left', `${this.AsideWidthTransform}px`);

        this.$set(this.ChartPopup.ContentContainerStyleObject, 'top', `${this.CalcCordsY(this.data.AxisYCords[0])}px`);

        this.$set(this.ChartPopup.DotStyleObject, 'top', `${this.CalcCordsY(this.data.AxisYCords[0])}px`);
      },
      MoveChartPopup(event){
        this.columns.forEach((el, index) => {
          if (event.offsetX >= el[0] && event.offsetX <= el[1]){
            if (index < this.data.AxisYCords.length){
              const CurrentDay = new Date(parseInt(this.date[0].split('.')[2]), parseInt(this.date[0].split('.')[1]), parseInt(this.date[0].split('.')[0]) + (this.data.AxisXCords[index] - 1));
              const CurrentMonth = () => {
                switch (CurrentDay.getMonth()) {
                  case 0:
                    return 'Января';
                  case 1:
                    return 'Февраля';
                  case 2:
                    return 'Марта';
                  case 3:
                    return 'Апреля';
                  case 4:
                    return 'Мая';
                  case 5:
                    return 'Июня';
                  case 6:
                    return 'Июля';
                  case 7:
                    return 'Августа';
                  case 8:
                    return 'Сентября';
                  case 9:
                    return 'Октября';
                  case 10:
                    return 'Ноября';
                  case 11:
                    return 'Декабря';
                }
              };

              this.$set(this.ChartPopup.MainContainerStyleObject, 'left', `${el[0]}px`);

              this.$set(this.ChartPopup.ContentContainerStyleObject, 'top', `${this.CalcCordsY(this.data.AxisYCords[index])}px`);

              this.$set(this.ChartPopup.DotStyleObject, 'top', `${this.CalcCordsY(this.data.AxisYCords[index])}px`);

              this.ChartPopup.text = `${this.data.AxisYCords[index]} ${this.HelperText}`;
              this.ChartPopup.date = `${CurrentDay.getDate()} ${CurrentMonth()}`;
            }
          }
        });
      }
    },
    computed: {
      ...mapGetters({
        SidebarState: 'SidebarState',
      }),
      days(){
        if (this.date.length > 0){
          const StartDate = new Date(parseInt(this.date[0].split('.')[2]),parseInt(this.date[0].split('.')[1]),parseInt(this.date[0].split('.')[0]));
          const EndDate = new Date(parseInt(this.date[1].split('.')[2]),parseInt(this.date[1].split('.')[1]),parseInt(this.date[1].split('.')[0]));

          return (EndDate.getTime() - StartDate.getTime()) / (1000 * 3600 * 24) + 1;
        }
      }
    },
    watch: {
      SidebarState(){
        let timerId = setInterval(() => {
          this.CalcChartOptions();
          this.RenderChart();
          this.CalcChartPopupOptions();
        },5);

        setTimeout(() => {
          clearInterval(timerId);
        },350);
      },
      AxisYCords(){
        this.CalcChartOptions();
        this.RenderChart();
        this.CalcChartPopupOptions();
      },
      date(){
        if (this.date.length > 0){
          this.CalcChartOptions();
          this.RenderChart();
          this.CalcChartPopupOptions();
        }
      }
    }
  }
</script>

<style lang="scss">
  .line-chart{
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

  .chart-popup{
    display: block;

    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 3;

    transition: left ease 0.15s;

    pointer-events: none;

    &:before{
      content: '';
      display: block;

      width: 0.2rem;

      position: absolute;
      top: 0;
      bottom: 3.2rem;
      left: 50%;

      background-color: $color-main--lightgray;

      transform: translateX(calc(-50%));
    }

    &__content{
      width: auto;
      height: auto;

      padding: 0.4rem 0.8rem;

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      opacity: 1;

      box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.15);
      border-radius: 0.5rem 0.5rem 0 0.5rem;
      background-color: white;

      position: absolute;
      left: 0;
      z-index: 10;

      transform: translateX(calc(-100% - 0.1rem)) translateY(calc(-100% - 0.6rem));
      cursor: default;
      pointer-events: none;
      transition: opacity ease 0.35s, left ease 0.15s, top ease 0.15s;

      p{
        font-size: 1.2rem;
        line-height: 1.2rem;
        font-weight: 500;
        color: $color-main--black;
        white-space: nowrap;

        &:not(:first-of-type){
          margin-top: 0.4rem;
        }
      }

      &--active{
        opacity:  1;
      }
    }

    &__dot{
      width: 1.2rem;
      height: 1.2rem;

      opacity: 1;

      position: absolute;
      left: 50%;

      background-color: white;
      border-radius: 50%;
      border: 0.2rem solid $color-main--green;
      cursor: default;
      pointer-events: none;


      transform: translateX(-50%) translateY(-50%);
      z-index: 5;
      transition: opacity ease 0.35s, left ease 0.15s, top ease 0.15s;

      &--active{
        opacity:  1;
      }
    }
  }
</style>
