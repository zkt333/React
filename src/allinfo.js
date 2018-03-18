import React from 'react';

class Allinfo extends React.Component{
  constructor(props){
    super(props);
    this.setState={
       geturl:[],
    }
  }
  render(){
          var that = this;
          var detail = this.props.info.map(function(data){
            
               return(
                   <tr>
                   <td><a target={'_blank'} href={'https://www.nike.com/launch/t/' + data.seoSlug}><img src={data.desktopImageUrl} style={{width:'200px',height:'200px'}}/></a></td>
                        <td className='align-middle' onClick={() => that.props.checkdetail(data.threadId, true)}>{data.name}</td>
                        <td className='phonehidden align-middle'>{data.relationalId}</td>
                        <td className='phonehidden align-middle'>{data.product.merchStatus}</td>
        
                        <td className='phonehidden align-middle'>{data.product.effectiveInStockStartSellDate}</td>
                       
                        
                        <td className='phonehidden align-middle'><button className='btn btn-info' onClick={()=>that.props.checkdetail(data.threadId,true)}>Check</button></td>
                   </tr>
               )
          })
          return(
            <div style={{width:'80%',display:this.props.infostyle,margin:'auto'}}>
              <table className='allinfotable table table-inverse align-middle'>
                <tr className='phonehidden'>
                         <th></th>
                         <th>Name</th>
                         <th >Style-number</th>
                         <th >Status</th>
                         <th >Sell Date</th>
                         <th >Check Detail</th>
                      </tr>
                      {detail}
                </table>
              <button onClick={this.props.checkmore} style={{ display: 'block', 'padding': '5px', fontSize: '20px', margin: 'auto', width: '200px', marginTop: '20px' }} className='btn btn-outline-info'>Check More</button>
            </div>
          )
  }
}

export default Allinfo; 