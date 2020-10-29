export const state = () => ({
  Orders: [
    {
      id: 1,
      orderNumber: 1234567890,
      date: '05.09.2020',
      sum: '12 345',
      state: 'completed',
      // stateColor: 'orange',
      confirmationTime: '05.09.2020 22:00',
      marketPlace: 'Ozon'
    },
    {
      id: 2,
      orderNumber: 1234567891,
      date: '06.09.2020',
      sum: '12 345',
      state: 'confirmation',
      // stateColor: 'darkgray',
      confirmationTime: '05.09.2020 22:00',
      marketPlace: 'Goods'
    },
    {
      id: 3,
      orderNumber: 1234567892,
      date: '17.09.2020',
      sum: '12 345',
      state: 'shipped',
      // stateColor: 'green',
      confirmationTime: '05.09.2020 22:00',
      marketPlace: 'Ozon'
    },
    {
      id: 4,
      orderNumber: 1234567893,
      date: '29.09.2020',
      sum: '12 345',
      state: 'equipment',
      // stateColor: 'orange',
      confirmationTime: '05.09.2020 22:00',
      marketPlace: 'Wildberries'
    },
  ],
  Order: { // Ключ в Order является Id в Orders => id
    1 : [
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
    ],
    2 : [
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },

    ],
    3 : [
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },

    ],
    4 : [
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
      {
        product: 'Кофе молотый в растворимом Nesc...',
        count: 12,
        inStore: 34,
        price: '12 345',
        sum: '12 345'
      },
    ],
  }
});

export const getters = {
  Orders: state => {
    state.Orders.forEach(item=>{
      switch (item.state) {
        case 'completed':
          item.stateColor = 'orange';
          item.stateText = 'Скомплектован';
          break;
        case 'shipped':
          item.stateColor = 'green';
          item.stateText = 'Отгружен';
          break;
        case 'equipment':
          item.stateColor = 'orange';
          item.stateText = 'Комплектация';
          break;
        case 'confirmation':
          item.stateColor = 'darkgray';
          item.stateText = 'Подтверждение';
          break;
      }
    });
    return state.Orders
  },

  Order: state => state.Order
};
