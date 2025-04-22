import React, { useState } from 'react';
import sendRequest from '../utils/sendRequest';
import Graph from './graph';

const Input = () => {
    const [graph, setGraph] = useState([]);
    const [formData, setFormData] = useState({ source: '', target: '', capacity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [data, setData] = useState([])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.source || !formData.target || !formData.capacity) return;

        const newEdge = {
            source: formData.source,
            target: formData.target,
            capacity: parseInt(formData.capacity)
        };

        if (isEditing) {
            const updatedGraph = [...graph];
            updatedGraph[editIndex] = newEdge;
            setGraph(updatedGraph);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            setGraph([...graph, newEdge]);
        }

        setFormData({ source: '', target: '', capacity: '' });
    };

    const handleDelete = (index) => {
        const updatedGraph = graph.filter((_, i) => i !== index);
        setGraph(updatedGraph);
    };

    const handleEdit = (index) => {
        const edge = graph[index];
        setFormData({
            source: edge.source,
            target: edge.target,
            capacity: edge.capacity.toString()
        });
        setIsEditing(true);
        setEditIndex(index);
    };

    const calculate = async () => {
        try {
            console.log(JSON.stringify(graph));

            console.log(graph);
            const response = await sendRequest('calculate', 'POST', { graph });
            console.log(response);
            setData(response);
        } catch (error) {
            console.error('Error during calculation:', error);
        }
    }

    const testData2 = async () => {
        try {
            const response = await sendRequest('calculate', 'POST',
                [{ "source": "α", "target": "A", "capacity": 45 }, { "source": "α", "target": "B", "capacity": 25 }, { "source": "α", "target": "C", "capacity": 30 }, { "source": "A", "target": "D", "capacity": 10 }, { "source": "A", "target": "E", "capacity": 15 }, { "source": "A", "target": "G", "capacity": 20 }, { "source": "B", "target": "D", "capacity": 20 }, { "source": "B", "target": "E", "capacity": 5 }, { "source": "B", "target": "F", "capacity": 15 }, { "source": "C", "target": "F", "capacity": 10 }, { "source": "C", "target": "G", "capacity": 15 }, { "source": "D", "target": "ω", "capacity": 30 }, { "source": "E", "target": "ω", "capacity": 10 }, { "source": "F", "target": "ω", "capacity": 20 }, { "source": "G", "target": "ω", "capacity": 40 }]
            );
            console.log(response);
            setData(response);
        } catch (error) {
            console.error('Error during test:', error);
        }
    }

    const testData1 = async () => {
        try {
            const response = await sendRequest('calculate', 'POST',
                [{ "source": "α", "target": "B", "capacity": 60 }, { "source": "α", "target": "D", "capacity": 40 }, { "source": "α", "target": "E", "capacity": 25 }, { "source": "B", "target": "C", "capacity": 40 }, { "source": "B", "target": "E", "capacity": 30 }, { "source": "C", "target": "F", "capacity": 20 }, { "source": "C", "target": "I", "capacity": 50 }, { "source": "D", "target": "G", "capacity": 20 }, { "source": "E", "target": "C", "capacity": 15 }, { "source": "E", "target": "D", "capacity": 20 }, { "source": "E", "target": "G", "capacity": 10 }, { "source": "E", "target": "H", "capacity": 20 }, { "source": "F", "target": "E", "capacity": 10 }, { "source": "F", "target": "H", "capacity": 10 }, { "source": "F", "target": "I", "capacity": 5 }, { "source": "G", "target": "F", "capacity": 15 }, { "source": "G", "target": "H", "capacity": 30 }, { "source": "H", "target": "ω", "capacity": 55 }, { "source": "I", "target": "H", "capacity": 20 }, { "source": "I", "target": "ω", "capacity": 60 }]
            );
            console.log(response);
            setData(response);
        } catch (error) {
            console.error('Error during test:', error);
        }
    }

    return (
        <div>
            <div>
                <div>
                    <div>Configurer le graph</div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-4'>
                            <div>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    className='border rounded-md p-2 w-full'
                                    placeholder='Début'
                                    tabIndex={1}
                                />
                                <div className='flex gap-2 mt-2'>
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, source: 'α' })}
                                        className='transition-all bg-gray-900 text-gray-50 px-3 py-2 rounded-md active:text-gray-200 active:bg-gray-800'
                                    >α</button>
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, source: 'ω' })}
                                        className='transition-all bg-gray-900 text-gray-50 px-3 py-2 rounded-md active:text-gray-200 active:bg-gray-800'
                                    >ω</button>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                    className='border rounded-md p-2 w-full'
                                    placeholder='Fin'
                                    tabIndex={2}
                                />
                                <div className='flex gap-2 mt-2'>
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, target: 'α' })}
                                        className='transition-all bg-gray-900 text-gray-50 px-3 py-2 rounded-md active:text-gray-200 active:bg-gray-800'
                                    >α</button>
                                    <button
                                        type='button'
                                        onClick={() => setFormData({ ...formData, target: 'ω' })}
                                        className='transition-all bg-gray-900 text-gray-50 px-3 py-2 rounded-md active:text-gray-200 active:bg-gray-800'
                                    >ω</button>
                                </div>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    name="capacity"
                                    value={formData.capacity}
                                    onChange={handleChange}
                                    className='border rounded-md p-2 w-full'
                                    placeholder='Capacité'
                                    tabIndex={3}
                                />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button
                                type='submit'
                                className='p-2 bg-gray-900 text-white border border-black rounded-md hover:bg-gray-800 transition-all'
                            >
                                {isEditing ? 'Mettre à jour' : 'Ajouter'}
                            </button>
                            <button
                                type='button'
                                onClick={calculate}
                                className='ml-4 p-2 bg-green-600 text-white border border-black rounded-md hover:bg-green-500 transition-all'
                            >
                                Calculer
                            </button>
                            <button
                                type='button'
                                onClick={testData1}
                                className='ml-4 p-2 bg-yellow-400 text-white border border-black rounded-md hover:bg-green-500 transition-all'
                            >
                                Test 1
                            </button>
                            <button
                                type='button'
                                onClick={testData2}
                                className='ml-4 p-2 bg-yellow-500 text-white border border-black rounded-md hover:bg-green-500 transition-all'
                            >
                                Test 2
                            </button>
                            {isEditing && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ source: '', target: '', capacity: '' });
                                    }}
                                    className='ml-4 p-2 bg-gray-300 border border-black rounded-md hover:bg-gray-200 transition-all'
                                >
                                    Annuler
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Liste des arêtes */}
                    <div className='mt-6'>
                        <h3 className='font-bold mb-2'>Arêtes ajoutées :</h3>
                        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-center gap-2 transition-all p-4'>
                            {graph.map((edge, index) => (
                                <div key={index} className='bg-gray-200 shadow-lg rounded-md p-2 text-center'>
                                    <span>{edge.source} → {edge.target} : {edge.capacity}</span>
                                    <div className='space-x-1'>
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className='text-sm p-1 bg-blue-600 text-white rounded hover:bg-blue-500'
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className='text-sm p-1 bg-red-600 text-white rounded hover:bg-red-500'
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Graph data={data}/>
                </div>
            </div>
        </div>
    );
};

export default Input;
