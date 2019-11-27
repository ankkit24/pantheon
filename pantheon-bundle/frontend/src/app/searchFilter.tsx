import React, { Component } from 'react';
import {
  Button, ButtonVariant, TextInput, InputGroup, Chip, ChipGroup, ChipGroupToolbarItem, FormSelect, FormSelectOption
} from '@patternfly/react-core';
import '@app/app.css';
import { CaretDownIcon, SearchIcon, SortAlphaDownIcon, SortAlphaUpIcon } from '@patternfly/react-icons';
import { Grid, GridItem } from '@patternfly/react-core';
import { Fields } from '@app/Constants'

class SearchFilter extends Component<any, any> {
  public verOptions

  constructor(props) {
    super(props);
    this.state = {
      allProducts: [{prodName: '', prodVersions: {}}],
      chipGroups: [],
      isSortedUp: true,
      moduleTypeValue: '',
      productOptions: [
        { value: '', label: 'Select a Product', disabled: false },
      ],
      productValue: '',
      productsQueryParam: '',
      productsToQuery: [],
      productsUUID: [],
      productversionsQueryParam: '',
      searchText: '',
      sortByValue: '',
      versionOptions: [
        { value: '', label: 'Select a Version', disabled: false },
      ],
      versionSelected: '',
      versionUUID: '',
      versionValue: '',
      versionsToQuery: [],
    };
  }

  public componentDidMount() {
    this.fetchProductVersionDetails()
  }

  public render() {
    const { chipGroups } = this.state;


    for(const product of this.state.allProducts){
      if(product.prodName===this.state.productValue){
        this.verOptions = this.state.versionOptions
        for(const version of product.prodVersions){
          if(version.value!==''){
            this.verOptions.push(version)
          }
        }
        // console.log('verOptions:',this.verOptions)
      }
    }
    
    // if (this.state.allProducts[this.state.productValue]) {
    //   verOptions = this.state.allProducts[this.state.productValue]
    //   console.log("verOptions: ", verOptions)
    // }

    const moduleTypeItems = [
      { value: 'All', label: 'All', disabled: false },
      { value: 'Concept', label: 'Concept', disabled: false },
      { value: 'Procedure', label: 'Procedure', disabled: false },
      { value: 'Reference', label: 'Reference', disabled: false }
    ]

    const sortItems = [
      { value: 'Uploaded date', label: 'Uploaded date', disabled: false },
      { value: 'Title', label: 'Title', disabled: false },
      { value: 'Product', label: 'Product', disabled: false },
      { value: 'Published date', label: 'Published date', disabled: false },
      { value: 'Updated date', label: 'Updated date', disabled: false },
      { value: 'Module type', label: 'Module type', disabled: false }
    ]


    return (
      <React.Fragment>
        <div className="row-filter" >
          <Grid gutter="md">
            <GridItem span={4}>
              <InputGroup className="small-margin">
                <TextInput id="searchFilterInput" type="text" onKeyDown={this.props.onKeyDown} value={this.state.searchText} onChange={this.setSearchText} />
                <Button onClick={this.props.onClick} variant={ButtonVariant.control} aria-label="search button for search input">
                  <SearchIcon />
                </Button>
              </InputGroup>
            </GridItem>

            <GridItem span={3}>
              <FormSelect value={this.state.productValue} onChange={this.onChangeProduct} aria-label="FormSelect Product" id="productForm">
                {this.state.productOptions.map((option, index) => (
                  <FormSelectOption isDisabled={option.disabled} key={index} value={option.value} label={option.label} />
                ))}
              </FormSelect>
            </GridItem>

            <GridItem span={2}>
              <FormSelect className="small-margin" value={this.state.versionUUID} onChange={this.onChangeVersion} aria-label="FormSelect Version" id="productVersionForm">
                {this.verOptions.map((option) => (
                  <FormSelectOption isDisabled={false} key={option.value} value={option.value} label={option.label} required={false} />
                ))}
              </FormSelect>
            </GridItem>

            <GridItem span={1}>
              <FormSelect className="small-margin" value={this.state.moduleTypeValue} onChange={this.onChangeModuleType} aria-label="FormSelect ModuleType" id="moduleTypeForm">
                {moduleTypeItems.map((option) => (
                  <FormSelectOption isDisabled={false} key={option.value} value={option.value} label={option.label} required={false} />
                ))}
              </FormSelect>
            </GridItem>

            <GridItem span={1}>
              <FormSelect className="small-margin" value={this.state.sortByValue} onChange={this.onChangeSort} aria-label="FormSelect Sort" id="sortForm">
                {sortItems.map((option) => (
                  <FormSelectOption isDisabled={false} key={option.value} value={option.value} label={option.label} required={false} />
                ))}
              </FormSelect>
            </GridItem>

            <GridItem span={1}>
              <Button onClick={this.setSortedUp} variant={ButtonVariant.control} aria-label="search button for search input">
                {this.state.isSortedUp ? <SortAlphaDownIcon /> : <SortAlphaUpIcon />}
              </Button>
            </GridItem>
          </Grid>
  
        </div>
        <ChipGroup withToolbar={true}>
          {chipGroups.map(currentGroup => (
            <ChipGroupToolbarItem key={currentGroup.category} categoryName={currentGroup.category}>
              {currentGroup.chips.map(chip => (
                <Chip key={chip} onClick={this.deleteItem(chip)}>
                  {chip}
                </Chip>
              ))}
            </ChipGroupToolbarItem>
          ))}
        </ChipGroup>
      </React.Fragment>
      
    );
  }

  private setSearchText = (event) => this.setState({ searchText: event }, () => {
    this.setQuery();
  });

  private setSortedUp = () => {
    this.setState({ isSortedUp: !this.state.isSortedUp }, () => {
      this.setQuery()
    })
  };

  private fetchProductVersionDetails = () => {

    const path = '/content/products.harray.3.json'
    const products = [{prodName: '', prodVersions: {}}]
    const prodUUID = new Array()

    fetch(path)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          return products
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(responseJSON => {
        for(const prod of responseJSON.__children__){
          const productDetails = prod
          const pName = prod.__name__

          const versionDetails = productDetails.__children__[0].__children__
          const versions = [{ value: '', label: 'Select a Version', disabled: false }]

          for (const detail of versionDetails) {
              versions.push({ value: detail[Fields.JCR_UUID], label: detail.__name__, disabled: false })
          }
          products.push({prodName: pName, prodVersions: versions})
          prodUUID[pName] = prod[Fields.JCR_UUID]
      }
      console.log('pdts after for loop:', products)
      console.log('pdtsUUIDs after loop:', prodUUID)
        this.setState({
          allProducts: products
        },()=>{
          console.log("all products:", this.state.allProducts)
        })
        if (products) {
          const productItems = [{ value: 'Select a Product', label: 'Select a Product', disabled: false },]
          
          for (const item of products) {
            if(item.prodName !== ''){
              productItems.push({ value: item.prodName, label: item.prodName, disabled: false })
            }
          }
          if (productItems.length > 1) {
            this.setState({ productOptions: productItems })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      });
    return products;
  };

  private onChangeProduct = (productValue) => {
    this.setState({ productValue });
  }
  private onChangeVersion = () => {
    if (event !== undefined) {
      if (event.target !== null) {
        const selectedStr = "selectedOptions"
        if (this.state.versionUUID !== event.target[selectedStr][0].value) {
          this.setState({
            versionSelected: event.target[selectedStr][0].label,
            versionUUID: event.target[selectedStr][0].value,
            versionValue: event.target[selectedStr][0].label,
          }, () => {
            this.addChipItem();
          });
        }
      }
    }
  }

  private onChangeSort = (sortByValue) => {
    this.setState({ sortByValue }, () => {
        this.setQuery();
    });
  }
  private onChangeModuleType = (moduleTypeValue) => {
    this.setState({ moduleTypeValue }, () => {
        this.setQuery();
    });
  }

  private deleteItem = (id) => (event: any) => {
    const copyOfChipGroups = this.state.chipGroups;
    let product = ''
    for (let i = 0; copyOfChipGroups.length > i; i++) {
      const index = copyOfChipGroups[i].chips.indexOf(id);
      if (index !== -1) {
        const categoryKey = "category"
        product = copyOfChipGroups[i][categoryKey]
        copyOfChipGroups[i].chips.splice(index, 1);
        // check if this is the last item in the group category
        if (copyOfChipGroups[i].chips.length === 0) {
          copyOfChipGroups.splice(i, 1);
        }
      }
    }

    const uuidKey = "value"
    const versionUUID = this.state.allProducts[product].filter((e) => e.label === id)[0][uuidKey]
    const productUUID = this.state.productsUUID[product]
    if (versionUUID.trim() === "All") {
      let prodQuery = this.state.productsQueryParam
      prodQuery = prodQuery.replace("product=" + productUUID, '')
      if (prodQuery === '&') {
        prodQuery = ''
      }
      if (prodQuery.includes("&&")) {
        prodQuery = prodQuery.replace('&&', '&')
      }
      this.setState({ chipGroups: copyOfChipGroups, productsQueryParam: prodQuery }, () => {
        this.setQuery();
      });
    } else {
      let verQuery = this.state.productversionsQueryParam
      verQuery = verQuery.replace("productversion=" + versionUUID, '')
      if (verQuery === '&') {
        verQuery = ''
      }
      if (verQuery.includes("&&")) {
        verQuery = verQuery.replace('&&', '&')
      }
      this.setState({ chipGroups: copyOfChipGroups, productversionsQueryParam: verQuery }, () => {
        this.setQuery();
      });
    }
  };

  private addChipItem = () => {
    const copyOfChipGroups = this.state.chipGroups;
    let exist = false
    let index = 0
    for (let i = 0; copyOfChipGroups.length > i; i++) {
      const category = copyOfChipGroups[i].category
      if (category === this.state.productValue) {
        exist = true
        index = i
        break
      }
    }
    if (exist) {
      let chipExists = false
      for (const i of copyOfChipGroups[index].chips) {
        const chip = i
        if (chip === this.state.versionSelected) {
          chipExists = true
        }

      }
      if (!chipExists && this.state.versionSelected.trim() !== "Select a Version") {
        copyOfChipGroups[index].chips.push(this.state.versionSelected);
      }
    } else {
      copyOfChipGroups.push({
        category: this.state.productValue,
        chips: [this.state.versionSelected]
      })
    }

    const uuidKey = "value"
    const versionUUID = this.state.allProducts[this.state.productValue].filter((e) => e.label === this.state.versionValue)[0][uuidKey]
    // If version is All just add the product.
    let prodQuery = this.state.productsQueryParam
    let verQuery = this.state.productversionsQueryParam
    if (versionUUID.trim() === "All") {
      if (this.state.productsQueryParam.trim() !== "") {
        prodQuery += '&'
      }
      prodQuery += "product=" + this.state.productsUUID[this.state.productValue]
    } else if (versionUUID.trim() !== "") {
      if (this.state.productversionsQueryParam.trim() !== "") {
        verQuery += '&'
      }
      verQuery += "productversion=" + versionUUID
    }

    this.setState({ chipGroups: copyOfChipGroups, productsQueryParam: prodQuery, productversionsQueryParam: verQuery }, () => {
      this.setQuery();
    });
  };

  // Should be called after each change of state
  private setQuery = () => {
    let searchQuery = ''
    if (this.state.searchText.trim() !== "") {
      searchQuery += "search=" + this.state.searchText
    }

    if (this.state.productsQueryParam.trim() !== "") {
      if (searchQuery.trim() !== "") {
        searchQuery += "&"
      }
      searchQuery += this.state.productsQueryParam
    }

    if (this.state.productversionsQueryParam.trim() !== "") {
      if (searchQuery.trim() !== "") {
        searchQuery += "&"
      }
      searchQuery += this.state.productversionsQueryParam
    }

    // Default is All and should not add to the filter.
    if (this.state.moduleTypeValue.trim() !== "" && this.state.moduleTypeValue.trim() !== "All") {
      if (searchQuery.trim() !== "") {
        searchQuery += "&"
      }
      searchQuery += "type=" + this.state.moduleTypeValue
    }

    // Default key is Uploaded
    if (searchQuery.trim() !== "") {
      searchQuery += "&"
    }
    if (this.state.sortByValue.trim() === "") {
      searchQuery += "key=Uploaded"
    } else {
      searchQuery += "key=" + this.state.sortByValue
    }

    // isSortedUp is a boolean and will always have a set default
    if (searchQuery.trim() !== "") {
      searchQuery += "&"
    }
    searchQuery += "direction=" + (this.state.isSortedUp ? "desc" : "asc")

    this.props.filterQuery(searchQuery)
    console.log("This is the query: " + searchQuery)
  }
}

export { SearchFilter }; 