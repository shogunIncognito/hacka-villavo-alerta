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

const Search = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        if (query.trim() || category) {
            console.log(`Searching for ${query} in category ${category}`);
            // Limpia los campos después de buscar
            setQuery('');
            setCategory('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-md w-full">
            <div className="relative w-full md:w-4/5 flex-grow">
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search..."
                    className="search-input p-2 pl-10 border border-primary rounded-md focus:outline-none focus:ring focus:ring-primary w-full text-primary"
                    aria-label="Search"
                />
                <LucideSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
            </div>
            <div className="w-full md:w-1/5 flex flex-col md:flex-row items-center gap-4">
                <Select onValueChange={setCategory} value={category} className="w-full md:w-auto border border-primary text-primary">
                    <SelectTrigger className="p-2 border border-gray-300 rounded-md w-full text-primary">
                        <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel className="text-primary">Categoria</SelectLabel>
                            <SelectItem value="category1" className="text-primary">Categoria 1</SelectItem>
                            <SelectItem value="category2" className="text-primary">Categoria 2</SelectItem>
                            <SelectItem value="category3" className="text-primary">Categoria 3</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button
                    onClick={handleSearch}
                    disabled={!query.trim() && !category}
                    className={`p-2 rounded-md w-full md:w-auto ${!query.trim() && !category ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                >
                    Search
                </Button>
            </div>
        </div>
    );
};

export default Search;
