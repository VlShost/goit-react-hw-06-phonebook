import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'components/redux/selectors';
import { setFilter } from 'components/redux/filterSlice';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilter);

  return (
    <label className={css.filterLabel}>
      Find contacts by name
      <input
        className={css.filterInput}
        type="text"
        value={filterValue}
        onChange={e => dispatch(setFilter(e.currentTarget.value))}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
