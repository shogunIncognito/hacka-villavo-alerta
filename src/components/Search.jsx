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

const Search = () => {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = () => {
        // Implement search logic here
        console.log(`Searching for ${query} in category ${category}`);
    };

    return (
        <div className="flex items-center gap-4 p-10  rounded-md ">
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="search-input p-2 border border-gray-300 rounded-md"
            />
            <Select onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="w-44 p-2 border border-gray-300 rounded-md">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="category1">Category 1</SelectItem>
                        <SelectItem value="category2">Category 2</SelectItem>
                        <SelectItem value="category3">Category 3</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="search-button p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Search</Button>
        </div>
    );
};

export default Search;