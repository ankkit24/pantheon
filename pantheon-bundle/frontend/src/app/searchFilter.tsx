import React, { Component } from 'react';
import {
  Button, ButtonVariant, TextInput, InputGroup, Chip, ChipGroup, ChipGroupToolbarItem, FormSelect, FormSelectOption
} from '@patternfly/react-core';
import '@app/app.css';
import { CaretDownIcon, SearchIcon, SortAlphaDownIcon, SortAlphaUpIcon } from '@patternfly/react-icons';
import { Grid, GridItem } from '@patternfly/react-core';
import { Fields } from '@app/Constants'

class SearchFilter extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      chipGroups: [],
      moduleTypeValue: '',
     //  this.props.value+"+sortBy="+this.state.sortByValue+"+""type="+this.state.moduleTypeValue+"+"
      // 
      productOptions: [
        { value: '', label: 'Select a Product', disabled: false },
      ],
      productValue: '',
      sortByValue: '',
      versionOptions: [
        { value: '', label: 'Select a Version', disabled: false },
      ],
      versionSelected: '',
      versionUUID: '',
      versionValue: '',
    };
  }

  public componentDidMount() {
    this.fetchProductVersionDetails()
  }

  public render() {
    const { chipGroups } = this.state;

    let verOptions = this.state.versionOptions
    if (this.state.allProducts[this.state.productValue]) {
      verOptions = this.state.allProducts[this.state.productValue]
    }

    const moduleTypeItems = [
      { value: 'All', label: 'All', disabled: false },
      { value: 'Concept', label: 'Concept', disabled: false },
      { value: 'Procedure', label: 'Procedure', disabled: false },
      { value: 'Reference', label: 'Reference', disabled: false }
    ]

    const sortItems = [
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
                  <TextInput id="searchFilterInput" type="text" onKeyDown={this.props.onKeyDown} value={this.props.value} onChange={this.props.onChange} />
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
                  {verOptions.map((option) => (
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
            <Button onClick={this.props.onSort} variant={ButtonVariant.control} aria-label="search button for search input">
                  {this.props.isSortedUp ? <SortAlphaDownIcon /> : <SortAlphaUpIcon />}
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

  private fetchProductVersionDetails = () => {

    const path = '/content/products.harray.3.json'
    let key
    const products = new Array()

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
              // console.log("version name:",versionDetails[i].__name__)
              // console.log("version uuid:",versionDetails[i]["jcr:uuid"])
              versions.push({ value: detail[Fields.JCR_UUID], label: detail.__name__, disabled: false })
          }
          products[pName] = versions    
      }
        this.setState({
          allProducts: products
        })

        if (products) {
          const productItems = [{ value: 'Select a Product', label: 'Select a Product', disabled: false },]
          
          for (const item of products) {
            productItems.push({ value: item, label: item, disabled: false })
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
    for (let i = 0; copyOfChipGroups.length > i; i++) {
      const index = copyOfChipGroups[i].chips.indexOf(id);
      if (index !== -1) {
        copyOfChipGroups[i].chips.splice(index, 1);
        // check if this is the last item in the group category
        if (copyOfChipGroups[i].chips.length === 0) {
          copyOfChipGroups.splice(i, 1);
          this.setState({ chipGroups: copyOfChipGroups }, () => {
            this.setQuery();
        });
        } else {
          this.setState({ chipGroups: copyOfChipGroups }, () => {
            this.setQuery();
        });
        }
      }
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
      if (!chipExists) {
        copyOfChipGroups[index].chips.push(this.state.versionSelected);
      }
    } else {
      copyOfChipGroups.push({
        category: this.state.productValue,
        chips: [this.state.versionSelected]
      })
    }
    this.setState({ chipGroups: copyOfChipGroups }, () => {
      this.setQuery();
  });
  };

  // Should be called after each change of state
  private setQuery = () => {
    this.props.filterQuery("search="+this.props.value+"&product="+this.state.productUUID+"&productversion="+this.state.versionUUID+"&type="+this.state.moduleTypeValue+"&key="+this.state.sortByValue+"&direction="+this.props.isSortedUp)
  }

}

export { SearchFilter }; 