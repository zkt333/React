import React from 'react';

class Sizes extends React.Component{
  
  render(){
    if(this.props.size==false){
          var sizeinfo = function(){
            return (
              <tr>
                 <td>'null'</td>
                 <td>'null'</td>
              </tr>
            )

          }
           
    }else{
      var sizeinfo = this.props.size.map(function (data) {

        if (data.available) {
          return (
            <tr>
              <td>{data.localizedSize}</td>
              <td style={{ color: 'red' }}>{data.available.toString()}</td>
            </tr>
          )
        } else {
          return (
            <tr>
              <td>{data.localizedSize}</td>
              <td>{data.available.toString()}</td>
            </tr>
          )
        }

      })
      var sizelevel = this.props.sizelevel.map(function(data){
          return(
             <tr>
              <td>{data.level}</td>
            </tr>
             
          )
      })
    }

    return(
      <div style={{ width: '80%', margin: 'auto', display:this.props.stylesize,overflow:'hidden'}}>
        <table style={{ width: '66.6%', textAlign: 'center',float: 'left' }} className='table table-inverse'>
           <tr style={{font:'25px'}}>
             <th>Size</th>
             <th>available</th>
           </tr>
           {sizeinfo}
         </table>
        <table style={{ width: '33.3%', textAlign: 'center',float:'right'}} className='table table-inverse'>
          <tr style={{ font: '25px' }}>
            <th>Level</th>
          </tr>
          {sizelevel}
        </table>
       </div>
    )
  }
}

export default Sizes