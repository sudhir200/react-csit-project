import React from 'react';
import Card from "@material-ui/core/Card";

function TestComponentFunc({value, countries,onClickCountry}) {
    return (
        <div>

            {
                countries.map(country =>
                    <Card onClick={()=>onClickCountry(country)}>
                        {country.name}
                    </Card>)
            }

        </div>
    );
}

export default TestComponentFunc;