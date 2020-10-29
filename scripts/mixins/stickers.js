import * as JsBarcode from "jsbarcode";
import jsPDF from 'jspdf-yworks';
import svg2pdf from 'svg2pdf.js';

import { MontserratNormal, MontserratBold } from '~/assets/fonts/montserrat/montserrat';

const StickersCore = {
  data: () => {
    return {
      BarcodeValid: true,
      sticker: {
        eac: 'hide',
        expiration: true,
        barcode: '4606499001007',
        fields: [
          'Держатель для телефона POPSO',
          'Цвет: черный',
          'Страна: Россия',
        ]
      },
      printer: {
        orientation: 'horizontal',
        type: 'sticker',
        StickersPrinter: {
          value: '58x60',
        },
        DefaultPrinter: {
          horizontal: {
            SelectedValue: {
              title: '3',
              value: '3'
            },
            values: [
              {
                title: '1',
                value: '1'
              },
              {
                title: '2',
                value: '2'
              },
              {
                title: '3',
                value: '3'
              },
            ]
          },
          vertical: {
            SelectedValue: {
              title: '8',
              value: '8'
            },
          },
        }
      },
    }
  },
  methods: {
    async CreateBarcode(){
      const BarcodeOptions = {
        format: "ean13",
        font: "Montserrat",
        fontSize: 12,
        height: 50,
        fontOptions: 'bold',
        flat: true,
      };

      await JsBarcode(this.$refs.barcode, this.sticker.barcode, Object.assign(BarcodeOptions, {
        valid: (valid) => {
          this.BarcodeValid = valid;

          if (!valid){
            JsBarcode(this.$refs.barcode, '4606499001007', BarcodeOptions);

            this.BarcodeValid = false;
          }
        }
      }));

      this.$refs.barcode.setAttribute('height','60px');
      this.$refs.barcode.setAttribute('viewBox','0 0 210 65');
      this.$refs.barcode.querySelector('g').setAttribute('transform','translate(10, 0)');
      this.$refs.barcode.querySelector('rect').setAttribute('height','65');
      this.$refs.barcode.querySelector('text').removeAttribute('text-anchor');
      this.$refs.barcode.querySelector('text').setAttribute('x', '50');
    },
    CreatePDF(){
      const scale = 72 / 25.4;
      const sticker = this.$refs['sticker-container'];
      const barcode = this.$refs.barcode;
      const eac = this.sticker.eac !== 'hide' ? this.$refs.eac.querySelector('svg') : false;
      const FooterText = this.sticker.expiration ? sticker.querySelector('.sticker__footer--text') : false;
      const HelpersValues = {
        SheetSize: () => {
          let width = 0;
          let height = 0;

          if (this.PrintOptions.StickerType().type === 'sticker'){
            width = this.PrintOptions.Values['min-width'];
            height = this.PrintOptions.Values['min-height'];
          }

          if (this.PrintOptions.StickerType().type === 'a4'){
            width = 210;
            height = 297;
          }

          return {
            width: width,
            height: height,
          }
        },
        StickerSize: () => {
          return {
            width: this.PrintOptions.Values['min-width'],
            height: this.PrintOptions.Values['min-height']
          };
        },
        FontSize: () => {
          return parseInt(this.PrintOptions.StylesObject.MainText.fontSize.split('px')[0])  * 1.375;
        },
        FooterFontSize: () =>{
          return parseInt(this.PrintOptions.StylesObject.FooterText.fontSize.split('px')[0])  * 1.375;
        },
        TextGap: () => {
          return parseInt((this.PrintOptions.StylesObject.TextContainer.gridGap.split('px')[0]))
        },
        ContainerGap: () => {
          return parseInt((this.PrintOptions.StylesObject.Container.gridGap.split('px')[0]))
        },
        ContainerPadding: () => {
          return parseInt(this.PrintOptions.StylesObject.Container.padding.split('px')[0]);
        },
        FooterGap: () => {
          return 4;
        },
        FooterMargin: () => {
          const Container = this.$refs['sticker-container'];
          const Footer = Container.querySelector('.sticker__footer');
          const Padding = HelpersValues.ContainerPadding();

          let value = 0;

          value = (Container.clientHeight - Padding + HelpersValues.ContainerGap()) - Footer.clientHeight;

          return value;
        },
        Orientation: () => {
          let value = 'p';

          if (this.printer.type === 'sticker'){
            value = this.printer.orientation === 'vertical' ? 'p' : 'l';
          }

          if (this.printer.type === 'a4'){
            value = this.printer.orientation === 'vertical' ? 'l' : 'p';
          }

          return value;
        },
      };

      const name = () => {
        let name = `sticker_${this.sticker.barcode}_`;

        if (this.printer.type === 'sticker'){
          name += this.printer.StickersPrinter.value += '_';
        }

        if (this.printer.type === 'a4'){
          name += `${this.printer.DefaultPrinter.horizontal.SelectedValue.value}x${this.printer.DefaultPrinter.vertical.SelectedValue.value}_`;
        }

        name += `${new Date().getFullYear()}-${(new Date().getMonth() + 1) <= 9 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1)}-${new Date().getDate()}`;

        return name;
      };

      const PdfDocument = new jsPDF({
        format: [HelpersValues.SheetSize().width * scale, HelpersValues.SheetSize().height * scale],
        orientation: HelpersValues.Orientation(),
        unit: 'px'
      });

      const CreateStickerTemplate = (ScaleX, ScaleY) => {
        PdfDocument.addFileToVFS('MontserratNormal.ttf', MontserratNormal);
        PdfDocument.addFileToVFS('MontserratBold.ttf', MontserratBold);

        PdfDocument.addFont('MontserratNormal.ttf', 'Montserrat', 'normal');
        PdfDocument.addFont('MontserratBold.ttf', 'Montserrat', 'bold');

        PdfDocument.setFontSize(HelpersValues.FontSize());
        PdfDocument.setLineHeightFactor(1.25);
        PdfDocument.setTextColor(51,52,61);

        let TextTopOffset = 0;

        sticker.querySelectorAll('.sticker__text p').forEach((el, index) => {
          if (index <= (this.PrintOptions.Values.MaxTextFields - 1)){
            if (index === 0){
              PdfDocument.setFont('Montserrat', 'bold');
            } else {
              PdfDocument.setFont('Montserrat', 'normal');
            }

            const TextPosX = HelpersValues.ContainerPadding() + (HelpersValues.StickerSize().width * scale * ScaleX);
            const TextPosY = HelpersValues.ContainerPadding() + TextTopOffset + ((HelpersValues.StickerSize().height * scale * ScaleY));

            PdfDocument.text(el.innerHTML, TextPosX, TextPosY,{
              maxWidth: el.clientWidth,
              baseline: 'middle',
            });

            TextTopOffset += el.clientHeight + HelpersValues.TextGap();
          }
        });

        PdfDocument.setFontSize(HelpersValues.FooterFontSize());
        PdfDocument.setLineHeightFactor(1);

        if (FooterText){
          PdfDocument.text(FooterText.innerHTML, ((HelpersValues.StickerSize().width * scale) / 2) + ((HelpersValues.StickerSize().width * scale * ScaleX)), HelpersValues.FooterMargin() + ((HelpersValues.StickerSize().height * scale * ScaleY)),{
            align: 'center',
            baseline: 'middle',
          });
        }

        if (eac){
          svg2pdf(eac, PdfDocument, {
            xOffset: HelpersValues.ContainerPadding() + (HelpersValues.StickerSize().width * scale * ScaleX),
            yOffset: HelpersValues.FooterMargin() + (FooterText ? FooterText.clientHeight : 0) + (HelpersValues.StickerSize().height * scale * ScaleY),
            scale: eac.clientWidth / parseInt(eac.getAttribute('width'))
          });
        }

        svg2pdf(barcode, PdfDocument, {
          xOffset: HelpersValues.ContainerPadding() + (HelpersValues.StickerSize().width * scale * ScaleX) + (eac ? (eac.clientWidth + HelpersValues.ContainerGap()) : 0),
          yOffset: HelpersValues.FooterMargin() + (FooterText ? FooterText.clientHeight : 0) + (HelpersValues.StickerSize().height * scale * ScaleY),
          scale: barcode.clientWidth / parseInt(barcode.getAttribute('width').split('px')[0])
        });
      };

      if (this.printer.type === 'sticker'){
        CreateStickerTemplate(0, 0);
      }

      if (this.printer.type === 'a4'){
        const columns = this.PrintOptions.Values.columns;
        const rows = this.PrintOptions.Values.rows;

        for (let i = 0; i < columns; i++){
          for (let j = 0; j < rows; j++){
            if (HelpersValues.Orientation() === 'p'){
              CreateStickerTemplate(i, j);
            }

            if(HelpersValues.Orientation() === 'l'){
              CreateStickerTemplate(j, i);
            }
          }
        }
      }

      PdfDocument.save(name());
    },
    CreateTextField(){
      if (this.sticker.fields.length < this.PrintOptions.Values.MaxTextFields){
        this.sticker.fields.push('');
      }
    },
    SaveSticker(){
      const StickerParams = {};

      StickerParams['sticker'] = this.sticker;
      StickerParams.sticker['size'] = [parseInt(this.printer.StickersPrinter.value.split('x')[0]), parseInt(this.printer.StickersPrinter.value.split('x')[1])];

      StickerParams['printer'] = {
        a4: {
          horizontal: this.printer.DefaultPrinter.horizontal.SelectedValue.value,
          vertical: this.printer.DefaultPrinter.vertical.SelectedValue.value,
        },
        orientation: this.printer.orientation,
        type: this.printer.type,
        sticker: this.printer.StickersPrinter.value,
      };

      StickerParams['helpers'] = {
        file: 'sticker-generated.pdf',
        file_upload: 'sticker.pdf',
        gds_id: '125',
        status: '1',
        u_id: '25',
      };

      this.CreateNewSticker(StickerParams);
    },
  },
  computed:{
    PrintOptions(){
      const scale = 72 / 25.4;
      const Values = {
        StyleScale: 1.25
      };
      const StylesObject = {
        Container: {},
        TextContainer: {},
        MainText: {},
        FooterText: {},
        footer: {},
        barcode: {},
      };

      const StickerType = () => {
        let value = 1;
        let type = 'sticker';

        if (this.printer.type === 'sticker'){
          type = 'sticker';

          switch (this.printer.StickersPrinter.value) {
            case '43x25':
              value = 1;
              break;
            case '58x40':
              value = 2;
              break;
            case '58x60':
              value = 3;
              break;
            case '120x75':
              value = 4;
              break;
            default:
              value = 1;
              break;
          }
        }

        if (this.printer.type === 'a4'){
          type = 'a4';

          const columns = parseInt(this.printer.DefaultPrinter.horizontal.SelectedValue.value);
          const rows = parseInt(this.printer.DefaultPrinter.vertical.SelectedValue.value);

          Values['columns'] = columns;
          Values['rows'] = rows;

          switch (columns) {
            case 1:
              switch (rows) {
                case 2:
                  value = 1;
                  break;
                default:
                  value = 1;
                  break;
              }
              break;
            case 2:
              switch (rows) {
                case 2:
                  value = 2;
                  break;
                case 3:
                  value = 3;
                  break;
                case 4:
                  value = 4;
                  break;
                case 7:
                  value = 5;
                  break;
                default:
                  value = 2;
                  break;
              }
              break;
            case 3:
              switch (rows) {
                case 6:
                  value = 6;
                  break;
                case 7:
                  value = 7;
                  break;
                case 8:
                  value = 8;
                  break;
                default:
                  value = 6;
                  break;
              }
              break;
            default:
              value = 1;
          }
        }

        return {value , type};
      };

      const OrientationState = () => {
        return StickerType().value !== 1 && StickerType().type !== 'sticker';
      };

      const orientation = () => {
        let position = this.printer.orientation;

        if (!OrientationState){
          position = 'horizontal';
        }

        return {
          FirstValue: (position !== 'horizontal') ? 'min-height' : 'min-width' ,
          SecondValue: (position !== 'horizontal') ? 'min-width' : 'min-height',
          ThirdValue: (position !== 'horizontal') ?  'max-height' : 'max-width',
          FourValue: (position !== 'horizontal') ? 'max-width' : 'max-height',
        };
      };

      if (this.sticker.eac !== 'hide'){
        StylesObject.barcode['gridArea'] = '2 / 2 / 3 / 3';
      }

      if (this.sticker.eac === 'hide'){
        StylesObject.barcode['gridArea'] = '2 / 1 / 3 / 3';
      }

      if (StickerType().type === 'sticker'){
        const SickerFirstSize = parseInt(this.printer.StickersPrinter.value.split('x')[0]);
        const StickerSecondSize = parseInt(this.printer.StickersPrinter.value.split('x')[1]);

        StylesObject.Container[orientation().FirstValue] = `${SickerFirstSize * scale}px`;
        StylesObject.Container[orientation().SecondValue] = `${StickerSecondSize * scale}px`;
        StylesObject.Container[orientation().ThirdValue] = `${SickerFirstSize * scale}px`;
        StylesObject.Container[orientation().FourValue] = `${StickerSecondSize * scale}px`;


        Values[orientation().FirstValue] = SickerFirstSize;
        Values[orientation().SecondValue] = StickerSecondSize;

        switch (StickerType().value) {
          case 1:
            Values.StyleScale = 2.5;

            StylesObject.Container.padding = `${1.6 * scale}px ${scale}px 0px ${scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '6px';
            StylesObject.FooterText.fontSize = '5px';

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            Values['MaxTextFields'] = 3;
            Values['MaxLengths'] = 28;

            break;
          case 2:
            Values.StyleScale = 1.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            if (this.printer.orientation === 'vertical'){
              StylesObject.MainText.fontSize = '9px';
              StylesObject.FooterText.fontSize = '5px';

              StylesObject.TextContainer.gridGap = `${scale}px`;

              StylesObject.Container.gridGap = `${scale}px`;
              StylesObject.Container.gridTemplateColumns = `100%`;

              Values['MaxTextFields'] = 4;
              Values['MaxLengths'] = 30;
            }

            if (this.printer.orientation === 'horizontal'){
              StylesObject.MainText.fontSize = '7px';
              StylesObject.FooterText.fontSize = '7px';

              StylesObject.Container.gridGap = `${scale}px`;
              StylesObject.TextContainer.gridGap = `${scale}px`;

              StylesObject.Container.gridTemplateColumns = `100%`;

              Values['MaxTextFields'] = 3;
              Values['MaxLengths'] = 40;
            }

            break;
          case 3:
            Values.StyleScale = 1.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '8px';
            StylesObject.FooterText.fontSize = '6px';

            Values['MaxTextFields'] = 4;
            Values['MaxLengths'] = 45;

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            break;
          case 4:
            Values.StyleScale = 1;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '14px';
            StylesObject.FooterText.fontSize = '12px';


            if (this.printer.orientation === 'vertical'){
              StylesObject.TextContainer.gridGap = `${scale}px`;

              StylesObject.Container.gridGap = `${scale}px`;
              StylesObject.Container.gridTemplateColumns = `100%`;

              Values['MaxTextFields'] = 7;
              Values['MaxLengths'] = 30;
            }

            if (this.printer.orientation === 'horizontal'){
              StylesObject.TextContainer.gridGap = `${2 * scale}px`;
              StylesObject.TextContainer.gridTemplateColumns = `100%`;

              StylesObject.Container.gridGap = `${scale}px`;
              StylesObject.Container.gridTemplateColumns = `100%`;

              Values['MaxTextFields'] = 4;
              Values['MaxLengths'] = 35;
            }

            break;
        }
      }

      if (StickerType().type === 'a4'){
        let size = [];

        switch (StickerType().value) {
          case 1:
            size = [210, 148];
            Values.StyleScale = 0.5;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '18px';
            StylesObject.FooterText.fontSize = '14px';

            StylesObject.Container.gridTemplateColumns = `100%`;

            StylesObject.Container.gridGap = `${scale}px`;

            StylesObject.TextContainer.gridGap = `${scale}px`;

            Values['MaxTextFields'] = 4;
            Values['MaxLengths'] = 100;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 9;
              Values['MaxLengths'] = 60;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 4;
              Values['MaxLengths'] = 100;
            }

            break;
          case 2:
            size = [105, 148];
            Values.StyleScale = 0.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '18px';
            StylesObject.FooterText.fontSize = '14px';

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 5;
              Values['MaxLengths'] = 60;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 5;
              Values['MaxLengths'] = 60;
            }

            break;
          case 3:
            size = [105, 99];
            Values.StyleScale = 1.25;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '12px';
            StylesObject.FooterText.fontSize = '10px';

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 5;
              Values['MaxLengths'] = 60;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 10;
              Values['MaxLengths'] = 60;
            }

            break;
          case 4:
            size = [105, 74];
            Values.StyleScale = 1;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '12px';
            StylesObject.FooterText.fontSize = '10px';

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 6;
              Values['MaxLengths'] = 45;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 2;
              Values['MaxLengths'] = 60;
            }

            break;
          case 5:
            size = [105, 42.4];
            Values.StyleScale = 1;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '8px';
            StylesObject.FooterText.fontSize = '6px';

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 10;
              Values['MaxLengths'] = 30;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 1;
              Values['MaxLengths'] = 50;
            }

            break;
          case 6:
            size = [70, 49.5];
            Values.StyleScale = 1.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '9px';
            StylesObject.FooterText.fontSize = '6px';

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 5;
              Values['MaxLengths'] = 30;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 2;
              Values['MaxLengths'] = 55;
            }

            break;
          case 7:
            size = [70, 42.3];
            Values.StyleScale = 1.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '7px';
            StylesObject.FooterText.fontSize = '6px';

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 7;
              Values['MaxLengths'] = 35;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 2;
              Values['MaxLengths'] = 75;
            }

            break;
          case 8:
            size = [70, 37];
            Values.StyleScale = 1.75;

            StylesObject.Container.padding = `${4 * scale}px`;
            StylesObject.Container.transform = `scale(${Values.StyleScale})`;

            StylesObject.MainText.fontSize = '7px';
            StylesObject.FooterText.fontSize = '5px';

            StylesObject.TextContainer.gridGap = `${scale}px`;

            StylesObject.Container.gridGap = `${scale}px`;
            StylesObject.Container.gridTemplateColumns = `100%`;

            if (this.printer.orientation === 'vertical'){
              Values['MaxTextFields'] = 7;
              Values['MaxLengths'] = 30;
            }

            if (this.printer.orientation === 'horizontal'){
              Values['MaxTextFields'] = 1;
              Values['MaxLengths'] = 80;
            }

            break;
        }

        StylesObject.Container[orientation().FirstValue] = `${size[0] * scale}px`;
        StylesObject.Container[orientation().SecondValue] = `${size[1] * scale}px`;
        StylesObject.Container[orientation().ThirdValue] = `${size[1] * scale}px`;
        StylesObject.Container[orientation().FourValue] = `${size[1] * scale}px`;


        Values[orientation().FirstValue] = size[0];
        Values[orientation().SecondValue] = size[1];
      }

      return { StylesObject, Values, StickerType, OrientationState };
    },
    DefaultPrinterRows(){
      let rows = [];

      switch (parseInt(this.printer.DefaultPrinter.horizontal.SelectedValue.value)) {
        case 1:
          rows = [
            {
              title: '2',
              value: '2'
            }
          ];
          break;
        case 2:
          rows = [
            {
              title: '2',
              value: '2'
            },
            {
              title: '3',
              value: '3'
            },
            {
              title: '4',
              value: '4'
            },
            {
              title: '7',
              value: '7'
            },
          ];
          break;
        case 3:
          rows = [
            {
              title: '6',
              value: '6'
            },
            {
              title: '7',
              value: '7'
            },
            {
              title: '8',
              value: '8'
            },
          ];
          break;
      }

      return rows;
    },
  },
};

export  { StickersCore };
