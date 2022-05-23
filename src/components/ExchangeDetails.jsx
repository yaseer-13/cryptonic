import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import ErrorPage from './ErrorPage';

const ExchangeDetails = () => {
	const [error, setError] = useState(null);
	const [exchange, setExchange] = useState();
	const [loading, setLoading] = useState(false);

	const { id } = useParams();

	const fetchExchangeDetail = useCallback(() => {
		const exchangeDetailApiUrl = `https://api.coingecko.com/api/v3/exchanges/${id}`;

		axios
			.get(exchangeDetailApiUrl)
			.then((response) => {
				setExchange(response.data);
			})
			.catch((error) => {
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	useEffect(() => {
		fetchExchangeDetail();
	}, [fetchExchangeDetail]);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <ErrorPage />;
	}
	return (
		<>
			<div className='py-6  px-12 bg-[#14213d] min-h-screen text-[#e5e5e5] '>
				{/* ---------------------------------------------- Back to home Button ----------------------------------- */}
				<a
					href='/'
					className='bg-red-100 hover:bg-red-200 text-slate-900 my-15 py-2 text-md font-bold px-5 rounded'>
					{' '}
					Back to Home
				</a>

				<div>
					{/* ------------------------------------- Exchange Image, Name, Website ------------------------------------ */}
					<div className='grid sm:grid-cols-1 md:grid-cols-3  items-center justify-items-center gap-4 tracking-wide my-10'>
						{/* <div className='flex justify-between items-center tracking-wide mt-10 mb-5'> */}
						<img
							className='w-[5rem] h-[5rem] bg-white rounded-full  bg-green-50 p-0.5  sm:justify-self-center md:justify-self-start lg:justify-self-start xl:justify-self-start'
							src={exchange?.image}
							alt={exchange?.name}
						/>
						<div className='flex flex-col items-center'>
							<h1 className='text-5xl font-bold capitalize'>
								{exchange?.name.split(' ').shift()}
							</h1>
							<h2 className='tracking-wide font-semibold text-sm italic'>
								{' '}
								{exchange?.centralized
									? 'Centralized Exchange'
									: 'Decentralized Exchange'}
							</h2>
						</div>
						<a
							className=' bg-[#FDB239] hover:bg-[#F79902] text-[#023047] hover:duration-300 font-bold py-2  px-4 rounded text-center sm:justify-self-center md:justify-self-end lg:justify-self-end xl:justify-self-end'
							href={exchange?.url === null ? '' : exchange?.url}
							target='_blank'
							rel='noreferrer'>
							<span className='truncate'>
								{exchange?.name.split(' ').shift()}
							</span>{' '}
							Website
						</a>
					</div>

					{/* ------------------------------ Exchange Position, Country, Year of Establishment --------------------------- */}
					<div className='tracking-wide text-md '>
						<h1>
							Position:{' '}
							<span className='font-bold text-lg '>
								{exchange?.trust_score_rank}{' '}
							</span>
							in the World
						</h1>

						<h1>
							Country:{' '}
							{exchange?.country === null
								? 'Not Available'
								: exchange?.country}
						</h1>

						<h1>
							Year Established:{' '}
							{exchange?.year_established === null
								? 'Not Available'
								: exchange?.year_established}
						</h1>
					</div>

					{/* -------------------------------------------------- Description --------------------------------------------- */}
					<h2 className='py-10 text-justify text-lg'>
						About{' '}
						<span className='italic font-semibold'>{exchange?.name}</span>
						:{' '}
						{exchange?.description === ''
							? 'Sorry 🙁, No Description is Available for this Exchange '
							: exchange?.description}
					</h2>

					{/* ---------------------------------------------- Social Media Links ----------------------------------------- */}
					<h1 className='mb-5'>
						<span className='italic font-semibold'>
							{exchange?.name}'s{' '}
						</span>{' '}
						Social media links
					</h1>
					<div className=' bg-[#20335d] p-4 rounded-lg'>
						<div className=' grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6   gap-5'>
							<a
								className='bg-[#FF4500] hover:bg-[#c14d23] text-white font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.reddit_url === ''
										? ''
										: exchange?.reddit_url
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-brands fa-reddit-alien  mr-4'></i>{' '}
								Reddit
							</a>
							<a
								className='bg-[#229ED9] hover:bg-[#2988b4] text-white font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.telegram_url === ''
										? 'Not Available '
										: exchange?.telegram_url
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-brands fa-telegram mr-4'></i>
								Telegram
							</a>
							<a
								className='bg-[#1DA1F2] hover:bg-blue-500 text-white font-bold p-3 rounded text-center flex justify-center items-center'
								href={`https://twitter.com/${exchange?.twitter_handle}`}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-brands fa-twitter mr-4'></i> Twitter
							</a>
							<a
								className='bg-[#0165E1] hover:bg-[#1b62b9] text-white font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.telegram_url === ''
										? 'Not Available '
										: exchange?.telegram_url
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-brands fa-facebook-f mr-4'></i>
								Facebook
							</a>
							<a
								className='bg-[#ffff] text-slate-900 hover:bg-blue-100 font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.slack_url === '' ? '' : exchange?.slack_url
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-brands fa-slack mr-4'></i> Slack
							</a>
							<a
								className='bg-[#ffff] text-slate-900 hover:bg-blue-100 font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.other_url_1 === ''
										? 'Not Available'
										: exchange?.other_url_1
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-solid fa-link mr-4'></i> URL 1
							</a>

							<a
								className='bg-[#ffff] text-slate-900 hover:bg-blue-100 font-bold p-3 rounded text-center flex justify-center items-center'
								href={
									exchange?.other_url_2 === ''
										? 'No  available'
										: exchange?.other_url_2
								}
								target='_blank'
								rel='noreferrer'>
								<i className='fa-solid fa-link mr-4'></i> URL 2
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExchangeDetails;
