import Vue from 'vue'
const mixin = {
  data() {
    return {
      unitTypes: [],
      propertySpace: [20, 2000],
      sliderFormatter: null,
      sliderFormatter2: null,
      selectedRooms: [],
      selectedBaths: [],
      selectedSaleTypes: [],
      saleTypes: [
        // this.$t('all'),
        // this.$t('sale'),
        // this.$t('resale'),
        // this.$t('rent'),
      ],
      menuShow: false,
      // value: 'default_v',
      // data: ['default_v', 'price', 'area', 'bedrooms'],
      ready_to_move: '',
      showType: false,
      showPrice: false,
      selectedCommertialUnitTypes: [],
      selectedResidentialUnitTypes: [],
      tabSelection: '',
      defaultTabSelection: {
        type: 'residential',
        price: 'price',
      },
      priceList1: false,
      priceList2: false,
      priceList3: false,
      priceList4: false,
      priceList5: false,
      priceList6: false,
      price: ['', ''],
      min_down_payment: ['', ''],
      min_recurring_payment: ['', ''],
      unitTypeFilter: 'is_residentail',
      selectedUnitTypes: [],
      commerical: [],
      residential: [],
    }
  },
  methods: {
    initFilters() {
      this.filters.forEach(item => {
        switch (item.key) {
          case 'sale_type': {
            this.selectedSaleTypes = [...item.value]
            break
          }
          case 'ready_to_move': {
            this.ready_to_move = 'ready_to_move'
            break
          }
          case 'area': {
            this.propertySpace = [...item.value]
            break
          }
          case 'bedroom': {
            this.selectedRooms = [...item.value]
            break
          }
          case 'bathroom': {
            this.selectedBaths = [...item.value]
            break
          }
          case 'price': {
            this.price = [...item.value]
            break
          }
          case 'min_down_payment': {
            this.min_down_payment = [...item.value]
            break
          }
          case 'min_recurring_payment': {
            this.min_recurring_payment = [...item.value]
            break
          }
          case 'unit_type': {
            this.selectedUnitTypes = [...item.value]
            break
          }
        }
      })
    },
    async unitTypesFiltered(e: string) {
      if (e === 'Commercial') {
        this.unitTypeFilter = 'is_commercial'
      } else {
        this.unitTypeFilter = 'is_residentail'
      }
      // const result =
      //   e === 'Commercial'
      //     ? (this.unitTypeFilter = 'is_commercial=true')
      //     : 'is_residential=true'

      const unitTypes = await this.$axios.get('/get-unit-types', {
        params: {
          per_page: '100',
          [`filter[${this.unitTypeFilter}]`]: 'true',
        },
      })
      this.unitTypes = unitTypes?.data?.data
    },
    onTabSelect(val: string) {
      this.tabSelection = val
      this.selectedUnitTypes = []
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'unit_type',
        range: true,
        q: [[this.unitTypesList]],
        value: [...this.selectedUnitTypes],
      })
    },
    resetSelection() {
      switch (this.tabSelection.toLocaleLowerCase()) {
        case 'residential': {
          this.selectedUnitTypes = []
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'unit_type',
            range: true,
            q: [[this.unitTypesList]],
            value: [...this.selectedUnitTypes],
          })

          break
        }
        case 'commercial': {
          this.selectedUnitTypes = []
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'unit_type',
            range: true,
            q: [[this.unitTypesList]],
            value: [...this.selectedUnitTypes],
          })
          break
        }
        case 'price': {
          this.price = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'price',
            range: true,
            q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
            value: [...this.price],
          })
          break
        }
        case 'down payments': {
          this.min_down_payment = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'min_down_payment',
            range: true,
            q: [
              `min_down_payment >= ${this.min_down_payment[0]}`,
              `min_down_payment <= ${this.min_down_payment[1]}`,
            ],
            value: [...this.min_down_payment],
          })
          break
        }
        case 'installment': {
          this.min_recurring_payment = ['', '']
          this.$store.commit('filter/ADD_SELECTED_FILTERS', {
            key: 'min_recurring_payment',
            range: true,
            q: [
              `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
              `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
            ],
            value: [...this.min_recurring_payment],
          })
          break
        }
      }
    },
    setReadyToMove(status: string) {
      this.ready_to_move = status

      if (this.ready_to_move === 'ready_to_move') {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'ready_to_move',
          value: ['ready to move'],
        })
      } else {
        this.$store.commit('filter/REMOVE_SELECTED_FILTERS', 'ready_to_move')
      }
      this.submit()
    },
    setPropertySpace() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'area',
        range: true,
        q: [
          `area >= ${this.propertySpace[0]}`,
          `area <= ${this.propertySpace[1]}`,
        ],
        value: [...this.propertySpace],
      })
      if (this.$refs?.properitySpaceMenu?.menuShow) {
        this.$refs.properitySpaceMenu.menuShow = false
      }
    },
    // setPrice() {
    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'price',
    //     range: true,
    //     q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
    //     value: [...this.price],
    //   })
    // },
    setRoomCount(rc: string) {
      if (rc === 'all') {
        this.selectedRooms = []
      } else {
        const index = this.selectedRooms.indexOf(rc)
        if (index > -1) {
          this.selectedRooms.splice(index, 1)
        } else {
          this.selectedRooms.push(rc)
        }
      }
    },
    setBathsCount(bc: string) {
      if (bc === 'all') {
        this.selectedBaths = []
      } else {
        const index = this.selectedBaths.indexOf(bc)
        if (index > -1) {
          this.selectedBaths.splice(index, 1)
        } else {
          this.selectedBaths.push(bc)
        }
      }
    },
    onApplyRoomsAndBaths() {
      const roomspayload = this.selectedRooms.map(item => {
        if (item === 5) {
          return 'bedroom >= ' + item
        }
        return 'bedroom = ' + item
      })
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'bedroom',
        range: true,
        q: [[roomspayload]],
        value: [...this.selectedRooms],
      })

      const bathspayload = this.selectedBaths.map(item => {
        if (item === 5) {
          return 'bathroom >= ' + item
        }
        return 'bathroom = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'bathroom',
        range: true,
        q: [[bathspayload]],
        value: [...this.selectedBaths],
      })
      if (this.$refs?.roomsAndBathsMenu?.menuShow) {
        this.$refs.roomsAndBathsMenu.menuShow = false
      }
    },

    setSaleType(value: string) {
      console.log(value)

      if (value === 'all') {
        this.selectedSaleTypes = []
      } else {
        const index = this.selectedSaleTypes.indexOf(value)
        if (index > -1) {
          this.selectedSaleTypes.splice(index, 1)
        } else {
          this.selectedSaleTypes.push(value)
        }
      }

      const propertyTypesPayload = this.selectedSaleTypes.map(item => {
        return 'sale_type = ' + item
      })

      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'sale_type',
        range: true,
        value: [...this.selectedSaleTypes],
        q: [[propertyTypesPayload]],
      })
      this.submit()
    },
    // setCommertialUnitType(ut) {
    //   const index = this.selectedUnitTypes.indexOf(ut)
    //   if (index > -1) {
    //     this.selectedUnitTypes.splice(index, 1)
    //   } else {
    //     this.selectedUnitTypes.push(ut)
    //   }

    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'unit_type',
    //     range: true,
    //     q: [[this.unitTypesList]],
    //     value: [...this.selectedUnitTypes],
    //   })
    // },
    // setResidentialUnitType(ut) {
    //   const index = this.selectedUnitTypes.indexOf(ut)
    //   if (index > -1) {
    //     this.selectedUnitTypes.splice(index, 1)
    //   } else {
    //     this.selectedUnitTypes.push(ut)
    //   }

    //   this.$store.commit('filter/ADD_SELECTED_FILTERS', {
    //     key: 'unit_type',
    //     range: true,
    //     q: [[this.unitTypesList]],
    //     value: [...this.selectedUnitTypes],
    //   })
    // },
    setUnitTypes(ut) {
      const index = this.selectedUnitTypes.indexOf(ut)
      if (index > -1) {
        this.selectedUnitTypes.splice(index, 1)
      } else {
        this.selectedUnitTypes.push(ut)
      }

      // this.$store.commit('filter/ADD_SELECTED_FILTERS', {
      //   key: 'unit_type',
      //   range: true,
      //   q: [[this.unitTypesList]],
      //   value: [...this.selectedUnitTypes],
      // })
    },
    menuAwayClose() {
      this.menuShow = false
    },
    async setValue(value: string) {
      this.value = value
      this.menuAwayClose()
      this.$store.commit('CHANGE_LOADING', true)
      await this.$store.dispatch('unit/getUnits', {
        page: 1,
        include: [
          'developer',
          'unitType',
          'city',
          'state',
          'project',
          'agent',
          'agent.company',
          'amenities',
          'amenitiesCount',
        ],
        per_page: 27,
        sort: this.value === 'default_v' ? '' : this.value,
      })
      this.$store.commit('CHANGE_LOADING', false)
    },
    removeFilter(f: { key: string }) {
      this.$store.commit('filter/REMOVE_SELECTED_FILTERS', f.key)

      if (f.key === 'ready_to_move') {
        this.ready_to_move = ''
      }
      if (f.key === 'sale_type') {
        this.selectedSaleTypes = []
      }
      if (f.key === 'bedroom') {
        this.selectedRooms = []
      }
      if (f.key === 'bathroom') {
        this.selectedBaths = []
      }

      if (f.key === 'area') {
        this.propertySpace = [20, 2000]
      }
      if (f.key === 'price') {
        this.price = ['', '']
      }
      this.submit()
      // const payload = {
      //   path: 'units',
      //   filter: {
      //     key: f.key,
      //     value: '',
      //   },
      // }
      // this.$store.commit('filter/ADD_FILTER', payload)
    },
    async submit() {
      this.$store.commit('filter/APPLY')
      this.$store.commit('CHANGE_LOADING', true)
      const payload = {
        page: 1,
        include: [
          'developer',
          'unitType',
          'city',
          'state',
          'project',
          'agent',
          'agent.company',
          'amenities',
          'amenitiesCount',
        ],
        per_page: 27,
      }
      if (this.value !== 'default_v') {
        payload.sort = this.value
      }
      // await this.$store.dispatch('unit/getUnits', payload)
      await this.$store.dispatch('search/getItems', {
        fromUnits: true,
        page: 1,

        per_page: 25,
      } as RequestPayload<UnitAllowedInclude[]>)
      this.$store.commit('CHANGE_LOADING', false)
    },
    resetAll() {
      this.selectedBaths = []
      this.value = 'default_v'
      this.selectedRooms = []
      this.propertySpace = [20, 2000]
      this.price = ['', '']
      this.min_down_payment = []
      this.min_recurring_payment = []
      this.selectedSaleTypes = []
      this.ready_to_move = ''
      this.selectedUnitTypes = []
      this.selectedCommertialUnitTypes = []
      this.selectedResidentialUnitTypes = []

      if (this.$refs?.searchBar) {
        this.$refs.searchBar.searchedNames = []
        this.$refs.searchBar.searchPayload = []
      }

      this.$store.commit('filter/RESET')
      this.submit()

      // this.$store.commit('filter/CLEAR', payload)
      // this.submit()
    },
    saveSearch() {
      this.$store.commit('filter/APPLY')
      this.submit()
    },
    openList(list: any) {
      if (this[list]) {
        clearTimeout(this[list])
        return
      }

      this[list] = setTimeout(() => {
        this[list] = false
      }, 1500)
    },
    closeList(list: any) {
      this[list] = true
      this[list] = setTimeout(() => {
        this[list] = false
      }, 1500)
    },
    onAppliedType() {
      this.showType = false
      if (this.selectedUnitTypes && this.selectedUnitTypes.length) {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          range: true,
          q: [[this.unitTypesList]],
          value: [...this.selectedUnitTypes],
        })
      } else {
        this.$store.commit('filter/ADD_SELECTED_FILTERS', {
          key: 'unit_type',
          value: [this.tabSelection],
        })
      }
    },
    onApplyPrice() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'price',
        range: true,
        q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
        value: [...this.price],
      })

      // min_down_payment case
      const minDownPayment = {
        key: 'min_down_payment',
        range: true,
        q: [
          `min_down_payment >= ${this.min_down_payment[0]}`,
          `min_down_payment <= ${this.min_down_payment[1]}`,
        ],
        value: [...this.min_down_payment],
      }
      if (this.min_down_payment[0] === this.pricesArray[0]) {
        minDownPayment.q.shift()
      }
      if (
        this.min_down_payment[1] ===
        this.pricesArray[this.pricesArray.length - 1]
      ) {
        minDownPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minDownPayment)
    },
    onApplyMinDownPayment() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'min_down_payment',
        range: true,
        q: [
          `min_down_payment >= ${this.min_down_payment[0]}`,
          `min_down_payment <= ${this.min_down_payment[1]}`,
        ],
        value: [...this.min_down_payment],
      })
    },
    onApplyMinRecurringpayment() {
      this.$store.commit('filter/ADD_SELECTED_FILTERS', {
        key: 'min_recurring_payment',
        range: true,
        q: [
          `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
          `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
        ],
        value: [...this.min_recurring_payment],
      })
    },
    onApplyPrices() {
      // this.$store.commit('filter/ADD_SELECTED_FILTERS', {
      //   key: 'price',
      //   range: true,
      //   q: [`price >= ${this.price[0]}`, `price <= ${this.price[1]}`],
      //   value: [...this.price],
      // })

      // price case
      console.log('price', this.price)
      const price = {
        key: 'price',
        range: true,
        q: [
          `price >= ${this.price[0].replace(' M', '000000')}`,
          `price <= ${this.price[1].replace(' M', '000000')}`,
        ],
        value: [...this.price.map(item => item.replace(' M', '000000'))],
      }
      if (this.price[0] === this.millonsArray[0]) {
        price.q.shift()
      }
      if (this.price[1] === this.millonsArray[this.millonsArray.length - 1]) {
        price.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', price)

      // min_down_payment case
      const minDownPayment = {
        key: 'min_down_payment',
        range: true,
        q: [
          `min_down_payment >= ${this.min_down_payment[0]}`,
          `min_down_payment <= ${this.min_down_payment[1]}`,
        ],
        value: [...this.min_down_payment],
      }
      if (this.min_down_payment[0] === this.pricesArray[0]) {
        minDownPayment.q.shift()
      }
      if (
        this.min_down_payment[1] ===
        this.pricesArray[this.pricesArray.length - 1]
      ) {
        minDownPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minDownPayment)

      // min_recurring_payment case
      const minRecurringPayment = {
        key: 'min_recurring_payment',
        range: true,
        q: [
          `min_recurring_payment >= ${this.min_recurring_payment[0]}`,
          `min_recurring_payment <= ${this.min_recurring_payment[1]}`,
        ],
        value: [...this.min_recurring_payment],
      }
      if (this.min_recurring_payment[0] === this.installmentPrices[0]) {
        minRecurringPayment.q.shift()
      }
      if (
        this.min_recurring_payment[1] ===
        this.installmentPrices[this.installmentPrices.length - 1]
      ) {
        minRecurringPayment.q.pop()
      }
      this.$store.commit('filter/ADD_SELECTED_FILTERS', minRecurringPayment)

      // close menu
      if (this.$refs?.pricesMenu?.menuShow) {
        this.$refs.pricesMenu.menuShow = false
      }
    },
    showResult() {
      this.$store.commit('filter/APPLY')
      // this.$router.push(this.localePath('/discover?page=1'))
      this.$store.commit('SET_MODAL', '')
    },
    setFilterValue() {
      this.onApplyRoomsAndBaths()
      this.onAppliedType()
      // this.onApplyPrice()
      this.onApplyMinDownPayment()
      this.onApplyMinRecurringpayment()
      this.onApplyPrices()
    },
  },
  computed: {
    filters() {
      return [...this.$store.state.filter.selectedFilters]
    },
    display() {
      return this.$store.state.display
    },
    // selectedUnitTypes() {
    //   return this.selectedCommertialUnitTypes.concat(
    //     this.selectedResidentialUnitTypes
    //   )
    // },
    unitTypesList() {
      return this.selectedUnitTypes.map(item => {
        return 'unit_type = ' + item
      })
    },
    millonsArray() {
      const list = ['1 M']
      for (let i = 5; i <= 50; i += 5) {
        list.push(i + ' M')
      }
      return list
    },
    pricesArray() {
      if (this.$store.state.filter.searchType === 'buy') {
        return [
          100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
          900000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 1600000,
          1700000, 1800000, 1900000, 2000000, 4000000, 6000000, 8000000,
          10000000, 20000000, 40000000, 60000000, 80000000, 100000000,
        ]
      }
      if (this.$store.state.filter.searchType === 'rent') {
        return [
          2000, 4000, 3000, 5000, 6000, 7000, 8000, 9000, 10000, 20000, 40000,
          60000, 80000, 100000, 200000, 300000, 400000, 500000,
        ]
      }
      return []
    },
    installmentPrices() {
      const arr = []
      for (let i = 5000; i <= 500000; i += 5000) {
        arr.push(i)
      }
      return arr
    },
  },
}

Vue.mixin(mixin)
// export default mixin

export default Vue.extend(mixin)
