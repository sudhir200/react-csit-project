const gtag = window.gtag;

export function eventAnalyst(category,action,label,value)
{
    gtag('event',action,{
        eventCategory: category,
        eventAction: action,
        eventLabel: label,
        eventValue:value
    })
}