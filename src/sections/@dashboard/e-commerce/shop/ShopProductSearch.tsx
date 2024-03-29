import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// next
import { useRouter } from 'next/router';
// @mui
import { Link, Typography, Autocomplete, InputAdornment } from '@mui/material';
// utils
import axios from '../../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { IProduct } from '../../../../@types/product';
// components
import Image from '../../../../components/image';
import Iconify from '../../../../components/iconify';
import { CustomTextField } from '../../../../components/custom-input';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const { push } = useRouter();

  const [searchProducts, setSearchProducts] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  const handleChangeSearch = async (value: string) => {
    try {
      setSearchProducts(value);
      if (value) {
        const response = await axios.get('v1/products', {
          params: { search: value },
        });

        setSearchResults(response.data.Products.Data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGotoProduct = (name: string) => {
    push(PATH_DASHBOARD.eCommerce.view(paramCase(name)));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleGotoProduct(searchProducts);
    }
  };

  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product: IProduct) => product.Name}
      noOptionsText={<SearchNotFound query={searchProducts} />}
      isOptionEqualToValue={(option, value) => option.Id === value.Id}
      componentsProps={{
        popper: {
          sx: {
            width: `330px !important`,
          },
        },
        paper: {
          sx: {
            '& .MuiAutocomplete-option': {
              px: `8px !important`,
            },
          },
        },
      }}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          width={300}
          placeholder="Tìm kiếm..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { Name,  ImageURL, Id} = product;
        const matches = match(Name, inputValue);
        const parts = parse(Name, matches);

        return (
          <li {...props}>
            <Image
              alt={ImageURL}
              src={ImageURL}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />

            <Link underline="none" onClick={() => handleGotoProduct(Id)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
