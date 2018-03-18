import React from 'react';
import axios from 'axios';
import Info from './info';
import Sizes from './sizedetail';
import Allinfo from './allinfo';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
    this.checkall = this.checkall.bind(this);
    this.checkmore = this.checkmore.bind(this);
    this.checkdetail = this.checkdetail.bind(this);
    this.changecountry = this.changecountry.bind(this);
    this.state = {
      style1: 'none',
      img: 1,
      stylecode: null,
      active: false,
      createDate: null,
      updataData: null,
      publishDate: null,
      seotitle: null,
      restrication: false,
      size:[],
      allinfo:[],
      infostyle:'none',
      skip:10,
      stylesize:'none',
      link:null,
      country:'US',
      lanauage:'en_US',
      autorefresh:[],
      proxies: ['67.220.237.176', '67.220.237.177','67.220.237.178'],
      keywords:'pass',
      sizelevel:[],
    };
  }
  defaultset(){
    this.setState({
      style:'none',
      img: null,
      stylecode: null,
      active: false,
      createDate: null,
      updataData: null,
      publishDate: null,
      seotitle: null,
      restrication: false,
    })
  }
  check(){
    var stylecode = document.getElementById('test').value.toUpperCase();
    var that = this;
    axios.get('https://api.nike.com/commerce/productfeed/products/snkrs/'+stylecode+'/thread?country='+this.state.country+'&locale='+this.state.lanauage+'&withCards=true')

      .then(function (response) {

        console.log(response.data.id);
        that.setState({
          style1: 'block',
          infostyle:'none',
          img: response.data.desktopImageUrl,
          stylecode: response.data.relationalId,
          active: response.data.product.merchStatus,
          createDate: response.data.product.selectionEngine,
          updataData: response.data.effectiveLastUpdatedDate,
          publishDate: response.data.product.effectiveInStockStartSellDate,
          seotitle: response.data.seoTitle,
          restrication: response.data.restricted.toString(),
          size: response.data.product.skus,
          stylesize:'block',
          link: response.data.seoSlug,

        })
        axios.get('https://api.nike.com/deliver/available_skus/v1/?filter=productIds(' + response.data.product.id + ')')
          .then(function (response1) {
            that.setState({
              sizelevel: response1.data.objects
            })
          })
          .catch(function (error) {
            alert(error);
          })
       

      })
     .catch(function (error) {

      alert(error);
      that.setState({
        style1: 'none',
        stylesize:'none',
        infostyle:'none',
       })

    });  

  }
  checkall(){
    var that = this;
    axios.get('https://api.nike.com/commerce/productfeed/products/v1.5/snkrs/threads?country='+this.state.country+'&locale='+this.state.lanauage+'&withCards=false&limit=10&skip=0')
    .then(function(response){
           that.setState({
             allinfo: response.data.threads,
             infostyle:'block',
             stylesize:'none',
             style1: 'none',
             skip: 10,
           })
    })
    .catch(function(error){
           alert(error);
    })
  }
  checkmore(){
      var that = this;
      axios.get('https://api.nike.com/commerce/productfeed/products/v1.5/snkrs/threads?country='+this.state.country+'&locale='+this.state.lanauage+'&withCards=false&limit=10&skip='+that.state.skip)
      .then(function(response){
        var allinfo = that.state.allinfo.concat(response.data.threads);
        var skip = that.state.skip+10;
        that.setState({
          allinfo: allinfo,
          skip:skip, 
          stylesize:'none',
          style1: 'none',
        })

      })
      .catch(function(error){
        console.log(error);
      })
  }
  changecountry(){
    const select = document.getElementById('change');
    const lanauage = select.options[select.selectedIndex].value;
    const country = select.options[select.selectedIndex].text;
    this.setState({
      country: country,
      lanauage: lanauage
    })
  }
  checkdetail(data,indicator) {
    if (indicator){
      var that = this;
      const url = 'https://api.nike.com/commerce/productfeed/products/snkrs/threads/threadId?country='+this.state.country+'&locale='+this.state.lanauage+'&withCards=false&id=' + data;
      axios.get(url)
        .then(function (response) {
          console.log(response.data.id);
          if (response.data.product.skus!=null){
            that.setState({
              style1: 'block',
              infostyle: 'none',
              img: response.data.desktopImageUrl,
              stylecode: response.data.relationalId,
              active: response.data.product.merchStatus,
              createDate: response.data.product.selectionEngine,
              updataData: new Date(response.data.effectiveLastUpdatedDate.replace('T', 'GMT')).toString(),
              publishDate: new Date(response.data.product.effectiveInStockStartSellDate.replace('T', 'GMT')).toString(),
              seotitle: response.data.seoTitle,
              restrication: response.data.restricted.toString(),
              size: response.data.product.skus,
              stylesize: 'block',
              link: response.data.seoSlug,
            })
            axios.get('https://api.nike.com/deliver/available_skus/v1/?filter=productIds(' + response.data.product.id+')')
            .then(function(response1){
                  that.setState({
                    sizelevel: response1.data.objects
                  })
            })
            .catch(function(error){
              alert(error);
            })
          }else{
            that.setState({
              style1: 'block',
              infostyle: 'none',
              img: response.data.desktopImageUrl,
              stylecode: response.data.relationalId,
              active: response.data.product.merchStatus,
              createDate: response.data.product.selectionEngine,
              updataData: new Date(response.data.effectiveLastUpdatedDate.replace('T', 'GMT')).toString(),
              publishDate: response.data.product.effectiveInStockStartSellDate,
              seotitle: response.data.seoTitle,
              restrication: response.data.restricted.toString(),
              size: [{ available: 'null', localizedSize:'null'}],
              stylesize: 'block',
              link: response.data.seoSlug
            })
          }
        
        })
        .catch(function (error) {
            alert('no info');        

        })
    }else{
      console.log('error');
    }

  }
  render() {
    return(
        <div>
        <input placeholder='style-number' ref='stylevalue' id='test' style={{borderRadius:'10px',padding:'5px'}}></input>
              <button onClick={this.check} className='btn btn-success'>Check</button>
              <button onClick={this.checkall} className='btn btn-outline-info' style={{display:'block','padding':'5px',fontSize:'20px',margin:'auto',width:'200px',marginTop:'20px'}}>Search All</button>
              <select onChange={this.changecountry} id='change' className='form-control' style={{textAlign:'center',width:'100px',margin:'auto'}}>
                <option value='en_US'>US</option>
                 <option value='zh_CN'>CN</option>
                 <option value='ja_JP'>JP</option>
              </select>
              <Allinfo info={this.state.allinfo} infostyle={this.state.infostyle} checkmore={this.checkmore} checkdetail={this.checkdetail}/>
              <Info style1={this.state.style1} 
                 img={this.state.img}
                 link={this.state.link}
                 stylecode={this.state.stylecode}
                 active={this.state.active}
                 createDate={this.state.createDate}
                 updataData={this.state.updataData}
                 publishDate={this.state.publishDate}
                 seotitle={this.state.seotitle}
                 restrication={this.state.restrication}
                 detail={this.state.detail}
              />
              <Sizes size={this.state.size} stylesize={this.state.stylesize} sizelevel={this.state.sizelevel}/>
         
        </div>
    );
  }
}

export default Search;