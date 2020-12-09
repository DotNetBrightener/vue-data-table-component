<template src="./templates/app.template.html"></template>
<style src="./app.style.css" lang="css"></style>

<script>
import Spinner from 'vue-simple-spinner';
import { orderBy } from 'lodash'

const addZero = value => (`0${value}`).slice(-2)

const formatDate = value => {
  if (value) {
    const dt = new Date(value)
    return `${addZero(dt.getDate())}/${addZero(
      dt.getMonth() + 1
    )}/${dt.getFullYear()}`
  }
  return ''
}

const initialData = [
  {
    id: 1,
    firstName: 'Lucca',
    lastName: 'Lin',
    hometown: 'Melbourne',
    dob: '13/02/1975',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 2,
    firstName: 'Zahid',
    lastName: 'Werner',
    hometown: 'Sydney',
    dob: '18/09/1979',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 3,
    firstName: 'Gabriel',
    lastName: 'Griffiths',
    hometown: 'Chicago',
    dob: '25/11/1984',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 4,
    firstName: 'Talha',
    lastName: 'Tucker',
    hometown: 'Berlim',
    dob: '27/01/1999',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 5,
    firstName: 'Aariz',
    lastName: 'Piper',
    hometown: 'Auckland',
    dob: '11/07/1964',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 6,
    firstName: 'Macsen',
    lastName: 'Schultz',
    hometown: 'Rio de Janeiro',
    dob: '01/10/1987',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 7,
    firstName: 'Sebastian',
    lastName: 'Cervantes',
    hometown: 'Brisbane',
    dob: '13/11/1994',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 8,
    firstName: 'Tayyab',
    lastName: 'Lister',
    hometown: 'Perth',
    dob: '14/12/1997',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 9,
    firstName: 'Anum',
    lastName: 'Warren',
    hometown: 'Manaus',
    dob: '17/02/1951',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 10,
    firstName: 'Areeba',
    lastName: 'Stein',
    hometown: 'Rome',
    dob: '18/03/1954',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 11,
    firstName: 'Alesha',
    lastName: 'Sharp',
    hometown: 'New York City',
    dob: '18/04/1966',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 12,
    firstName: 'Aadil',
    lastName: 'Fitzgerald',
    hometown: 'Vancouver',
    dob: '18/05/1967',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 13,
    firstName: 'Amaya',
    lastName: 'Dillon',
    hometown: 'Montreal',
    dob: '11/06/1986',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 14,
    firstName: 'Hammad',
    lastName: 'Ruiz',
    hometown: 'Buenos Aires',
    dob: '12/07/1997',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 15,
    firstName: 'Sapphire',
    lastName: 'Pacheco',
    hometown: 'Mexico City',
    dob: '12/07/1996',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 16,
    firstName: 'Amanah',
    lastName: 'Velez',
    hometown: 'London',
    dob: '13/08/1992',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 17,
    firstName: 'Mirza',
    lastName: 'Ratliff',
    hometown: 'Manchester',
    dob: '03/09/1981',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 18,
    firstName: 'Emre',
    lastName: 'Amos',
    hometown: 'Sapiranga',
    dob: '05/10/1983',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 19,
    firstName: 'Yunus',
    lastName: 'Vu',
    hometown: 'Madrid',
    dob: '05/10/1984',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 20,
    firstName: 'Duncan',
    lastName: 'Cotton',
    hometown: 'Barcelona',
    dob: '06/10/1985',
    created: new Date().getTime(),
    updated: new Date().getTime()
  },
  {
    id: 21,
    firstName: 'Elvis',
    lastName: 'Ray',
    hometown: 'Lisbon',
    dob: '08/11/1980',
    created: new Date().getTime(),
    updated: new Date().getTime()
  }
]

export default {
  name: 'app',
  components: {
    Spinner
  },
  data: function () {
    return {
      headerFields: [
        '__slot:checkboxes',
        {
          name: 'firstName',
          label: 'First Name',
          sortable: true
        },
        {
          name: 'lastName',
          label: 'Last Name',
          sortable: true
        },
        {
          name: 'hometown',
          label: 'Hometown',
          sortable: true,
          customElement: 'HometownNew'
        },
        {
          name: 'dob',
          label: 'Data of Birght',
          sortable: true
        },
        {
          name: 'created',
          customHeader: 'createdHeader',
          label: 'Created',
          sortable: true,
          format: formatDate
        },
        {
          name: 'updated',
          customHeader: true,
          sortable: true,
          format: formatDate
        },
        '__slot:actions:actionFirst',
        '__slot:actions'
      ],
      data: initialData.slice(0, 10),
      datatableCss: {
        table: 'table table-bordered table-hover table-striped table-center',
        theadTr: 'header-item',
        theadTh: 'custom-thead-th',
        thWrapper: 'th-wrapper',
        thWrapperCheckboxes: 'th-wrapper checkboxes',
        arrowsWrapper: 'arrows-wrapper',
        arrowUp: 'arrow up',
        arrowDown: 'arrow down',
        footer: 'footer'
      },
      paginationCss: {
        paginationItem: 'pagination-item',
        goToFirstPage: 'move-first-page',
        goToPreviousPage: 'move-previous-page',
        goToNextPage: 'move-next-page',
        goToLastPage: 'move-last-page',
        pageBtn: 'page-btn'
      },
      itemsPerPageCss: {
        select: 'item-per-page-dropdown'
      },
      isLoading: false,
      sort: 'asc',
      sortField: 'firstName',
      itemsPerPagePptions: [5, 10, 20, 50, 100],
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: initialData.length,
      hometown: null
    }
  },
  methods: {
    dtEditClick: props => alert(`Click props: ${JSON.stringify(props)}`),
    updateHeadersOrdering(newOrdered) {
      console.log('updated headers', newOrdered);
      this.headerFields = newOrdered;
    },
    dtUpdateSort: function ({ sortField, sort }) {
      const sortedData = orderBy(initialData, [sortField], [sort])
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = this.currentPage * this.itemsPerPage
      this.data = sortedData.slice(start, end)
    },

    updateItemsPerPage: function (itemsPerPage) {
      this.itemsPerPage = itemsPerPage
      if (itemsPerPage >= initialData.length) {
        this.data = initialData
      } else {
        this.data = initialData.slice(0, itemsPerPage)
      }
    },

    changePage: function (currentPage) {
      this.currentPage = currentPage
      const start = (currentPage - 1) * this.itemsPerPage
      const end = currentPage * this.itemsPerPage
      this.data = initialData.slice(start, end)
    },

    updateCurrentPage: function (currentPage) {
      this.currentPage = currentPage
    },

    changeHometown: function (event, id) {
      this.data = this.data.map(item => (item.id === id ? { ...item, hometown: event.target.value } : item))
    },

    actionFirstClick: (params) => {
      alert(JSON.stringify(params))
    }
  }
}
</script>
