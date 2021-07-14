import React, {useEffect} from 'react';
import {getCoronaData, getCoronaDataByMunicipality} from "../../apicall/corona";
import LoadingOutlined from "@ant-design/icons"
import "./corona.css"

function Corona(props) {
    const [displayData, setData] = React.useState([])
    const [municipalityData, setMuniData] = React.useState([])
    const [loading, setLoading] = React.useState(new Map())
    useEffect(() => {
        loading.set('muniData',true)
        getCoronaData().then(res => {
            setData(res.data)
        }).catch(err => {

        })
     /*   getCoronaDataByMunicipality().then(res => {
            setMuniData(res.data)
        }).catch(err => {

        })*/

    }, []);
    return (
        <div>
            <div className={"commonWrapper"}>
                <div className="cardWrapper">
                    {Object.keys(displayData).map((item) =>
                        <div align="center" className="corona-card">
                            {item.replace(/_/g, ' ').toUpperCase()}<br/>
                            {item === 'source' ? <a href={displayData[item]}>view</a> :
                                <span className="corona-value">
                                {item === 'latest_sit_report' ?
                                    <div className="displayGrid">
                                        {displayData[item].type}<br/>
                                        No:{displayData[item].no}
                                    </div> : displayData[item]}
                            </span>}
                        </div>
                    )}
                </div>
                { loading.get('muniData')?<LoadingOutlined/>:''}
              {/*  <div className="marginTop30">
                    {municipalityData.map((item,index)=>
                        <div>
                            {index}
                        </div>
                    )

                    }
                </div>*/}

            </div>
        </div>
    );
}

export default Corona;