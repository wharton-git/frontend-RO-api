import React, { useEffect, useState } from 'react'

const Graph = ({ data }) => {

    const [maxFlow, setMaxFlow] = useState()

    useEffect(() => {
        if (data) {
            setMaxFlow(data.flotMax || 'N/A')
        }
    }, [data])

    if (!data) {
        return <div>Loading...</div>
    }
    if (data.error) {
        return <div>{data.error}</div>
    }

    return (
        <div>
            <div>Resultat :</div>
            <div>Flot Max : {maxFlow}</div>
        </div>
    )
}

export default Graph
