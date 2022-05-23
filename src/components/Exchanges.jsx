import React from 'react';
// import './Exchanges.css';
import { Link } from 'react-router-dom';
const Exchanges = ({ id, name, country, url, logo, trustRank }) => {
	return (
		<>
			<div className='bg-[#14213d] h-full py-3 px-5 '>
				<section className='exchanges-section'>
					<div className='exchanges-head flex justify-between items-center mt-3 mb-6'>
						<img
							className='w-15 h-15 rounded-full mr-4 bg-white p-0.5  '
							src={logo}
							alt={name}
						/>
						<div className='rank-div text-[#e5e5e5]  flex'>
							<span className='m-2 text-md'>#</span>
							<h2 className='text-4xl font-bold' aria-hidden='true'>
								{trustRank}
							</h2>
						</div>
					</div>
					<div className='exchanges-body'>
						<h3
							className='font-bold text-[#e5e5e5] text-2xl capitalize truncate'
							aria-hidden='true'>
							{name}
						</h3>

						<p className='mb-5 text-[#e5e5e5] truncate  font-medium'>
							{country
								? `Country:  ${country}`
								: 'Country not available'}
						</p>
						<div className='flex justify-evenly'>
							{url && (
								<a
									className=' bg-[#FDB239] hover:bg-[#F79902] text-[#023047] hover:duration-300 font-bold py-2 my-5 px-4 rounded'
									href={url}
									target='_blank'
									rel='noreferrer'>
									<span className='truncate'>
										{name.split(' ').shift()}{' '}
									</span>
									Website
								</a>
							)}
							<Link
								key={id}
								className={
									' bg-[#FDB239] hover:bg-[#F79902] text-[#023047] hover:duration-300 font-bold py-2 my-5 ml-2 px-4 rounded'
								}
								to={`/exchanges/${id}`}>
								Details
							</Link>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default Exchanges;
