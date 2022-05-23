import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Loader from './Loader';
import Exchanges from './Exchanges';
import TextField from '@material-ui/core/TextField';
import Pagination from '@material-ui/lab/Pagination';

const HomePage = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState(1);
	const [searchInput, setSearchInput] = useState('');
	const [exchangeData, setExchangeData] = useState([]);

	const fetchingExchangeData = useCallback(() => {
		const coinGeckoExchangeApiUrl =
			'https://api.coingecko.com/api/v3/exchanges?per_page=250';

		axios
			.get(coinGeckoExchangeApiUrl)
			.then((response) => {
				setExchangeData(response.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		fetchingExchangeData();
	}, [fetchingExchangeData]);

	if (loading) {
		return <Loader />;
	}
	if (error) {
		return (
			<div className='flex h-screen '>
				<p className='font-bold m-auto text-[4.5vw] '>{error}</p>
			</div>
		);
	}

	const filteredExchangeData = exchangeData.filter((eachExchange) => {
		if (searchInput === '') {
			return eachExchange;
		} else if (
			eachExchange?.name.toLowerCase().includes(searchInput.toLowerCase())
		) {
			return eachExchange;
		}
		return null;
	});

	const inputChangeHandler = (event) => {
		setSearchInput(event.target.value);
	};

	return (
		<div className='bg-[#e5e5e5] min-h-screen'>
			<div className=' flex justify-center p-5'>
				<TextField
					id='outlined-basic'
					label='Search by Name'
					variant='outlined'
					fullWidth={true}
					autoComplete='off'
					onChange={inputChangeHandler}
				/>
			</div>

			<div className='px-10 py-5 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5 gap-x-7 gap-y-10'>
				{filteredExchangeData
					.slice((pagination - 1) * 10, (pagination - 1) * 10 + 10)
					?.map((eachExchange) => {
						return (
							<div
								key={eachExchange.id}
								className='rounded-xl overflow-hidden hover:shadow-2xl hover:duration-300'>
								<Exchanges
									id={eachExchange.id}
									name={eachExchange.name}
									country={eachExchange.country}
									url={eachExchange.url}
									logo={eachExchange.image}
									trustRank={eachExchange.trust_score_rank}
								/>
							</div>
						);
					})}
			</div>

			<div className='flex justify-center py-5'>
				<Pagination
					variant='outlined'
					shape='rounded'
					count={Number((filteredExchangeData?.length / 10).toFixed(0))}
					onChange={(_, value) => {
						setPagination(value);
						window.scroll(0, 0);
					}}
				/>
			</div>
		</div>
	);
};

export default HomePage;
