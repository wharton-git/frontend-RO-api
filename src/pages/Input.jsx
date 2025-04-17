import React, { useState } from 'react';
import sendRequest from '../utils/sendRequest';

const Input = () => {
    const [graph, setGraph] = useState([]);
    const [formData, setFormData] = useState({ source: '', target: '', capacity: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

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
            const response = await sendRequest('calculate', 'POST', { graph });
            console.log(response);
        } catch (error) {
            console.error('Error during calculation:', error);
        }
    }

    return (
        <div>
            <div>
                <div>Configurer le graph</div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-4'>
                            <input
                                type="text"
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                className='border rounded-md p-2 w-full'
                                placeholder='Début'
                            />
                            <input
                                type="text"
                                name="target"
                                value={formData.target}
                                onChange={handleChange}
                                className='border rounded-md p-2 w-full'
                                placeholder='Fin'
                            />
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                className='border rounded-md p-2 w-full'
                                placeholder='Capacité'
                            />
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
                        <ul className='list-disc ml-5 space-y-2'>
                            {graph.map((edge, index) => (
                                <li key={index} className='flex justify-between items-center'>
                                    <span>{edge.source} → {edge.target} : {edge.capacity}</span>
                                    <div className='space-x-2'>
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
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Input;
