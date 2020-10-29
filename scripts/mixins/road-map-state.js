import { mapGetters } from 'vuex';

const RoadMapState = {
  computed: {
    ...mapGetters({
      UserRoadMapData: 'user/UserRoadMapData'
    }),
    RoadMapState(){
      let ListProgress = 0;

      if (this.UserRoadMapData.length > 0){
        ListProgress = this.UserRoadMapData.map(el => el.options.status).findIndex(el => !el);
      }

      if (ListProgress === undefined) {
        ListProgress = this.UserRoadMapData.length;
      }

      return { ListProgress };
    },
  }
};

export  { RoadMapState };
