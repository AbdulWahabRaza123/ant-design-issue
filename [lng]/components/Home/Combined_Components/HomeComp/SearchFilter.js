import React from 'react'
import { Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./SearchFilter.css"

const SearchFilter = () => {
    return (
        <div className='flex gap-4'>
            <Input
                className="group_inputs search-input"
                name="search_filter"
                type="text"
                placeholder="Search for User, Data or Docs"
            />
            <Button type="primary" className='bg-primary search-button' shape="circle" icon={<SearchOutlined />} />
        </div>

    )
}

export default SearchFilter