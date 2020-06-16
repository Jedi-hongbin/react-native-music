import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { useTheme } from '@react-navigation/native'

export default SearchbarComponent = () => {
  const { colors } = useTheme()
  const [searchQuery,setSearchQuery] = React.useState('')
  _onChangeSearch = query => setSearchQuery(query);
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={_onChangeSearch}
      value={searchQuery}
      style={{
        marginVertical: 10,
        backgroundColor: colors.primary
      }}
    />
  )
}