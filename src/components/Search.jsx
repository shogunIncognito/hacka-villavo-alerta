import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search as LucideSearch } from 'lucide-react';
import { categorys } from '@/helpers/helpersAll';
import { axiosGet } from '@/helpers/requests/get';
import { Loader2 } from 'lucide-react'

export const Search = ({ setPosts }) => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false)

    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') {
    //         handleSearch();
    //     }
    // };

    const onSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosGet({ url: `/api/posts?search=${query.trim()}&category=${category.trim()}` })
            .then(res => {
                console.log(res)
                setPosts(res)
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-md w-full">
                <div className="relative w-full md:w-4/5 flex-grow">
                    <Input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar..."
                        className="search-input p-2 pl-10 border border-primary rounded-md focus:outline-none focus:ring focus:ring-primary w-full text-primary"
                        aria-label="Search"
                    />
                    <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                </div>
                <div className="w-full md:w-1/5 flex flex-col md:flex-row items-center gap-4">
                    <Select onValueChange={setCategory} value={category} className="w-full md:w-auto border border-primary text-primary">
                        <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full text-primary">
                            <SelectValue placeholder="Seleccionar Categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className="text-primary">Categoria</SelectLabel>
                                {/* <SelectItem value="" className="text-primary">Todas</SelectItem> */}
                                <SelectItem value=" " className="text-primary">Todas</SelectItem>
                                {
                                    categorys.map((cty) => {
                                        return (
                                            <>
                                                <SelectItem value={cty} className="text-primary">{cty}</SelectItem>
                                            </>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        disabled={!query.trim() && !category}
                        className={`p-2 rounded-md w-[118px] ${!query.trim() && !category ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                    >
                        {
                            loading ? <Loader2 className="h-4 w-4 animate-spin" /> :
                                <span>Buscar</span>
                        }
                    </Button>
                </div>
            </div>
        </form>

    );
};

export default Search;
