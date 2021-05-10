import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Controls(props) {
	let audio = useRef();

	let playButton = useRef();
	let range = useRef();
	let volumen = useRef();
	let loopButton = useRef();
	let randomButton = useRef();

	const [duration, setDuration] = useState(100);

	setInterval(() => {
		range.current.value = audio.current.currentTime;
		if (audio.current.currentTime == duration) {
			props.cancionSiguiente();
		}
	}, 1000);

	useEffect(() => {
		audio.current.onloadedmetadata = () => {
			audio.current.play();
			playButton.current.className = "fas fa-2x fa-pause";
			setDuration(audio.current.duration);
		};
	}, []);

	function play() {
		if (audio.current.paused) {
			audio.current.play();
			playButton.current.className = "fas fa-2x fa-pause";
		} else {
			audio.current.pause();
			playButton.current.className = "fas fa-2x fa-play";
		}
	}

	function suvirVolumen() {
		if (audio.current.volume < 1) {
			audio.current.volume += 0.1;
		}
		volumen.current.innerHTML =
			Math.floor(audio.current.volume * 100) + " %";
	}

	function bajarVolumen() {
		if (Math.floor(audio.current.volume * 100) > 0) {
			audio.current.volume -= 0.1;
		}
		volumen.current.innerHTML =
			Math.floor(audio.current.volume * 100) + " %";
	}

	function loop() {
		if (audio.current.loop) {
			audio.current.loop = false;
			loopButton.current.className = "";
		} else {
			audio.current.loop = true;
			loopButton.current.className = "text-primary";
		}
	}

	return (
		<>
			<div className="row justify-content-center align-items-center mt-5">
				<div className="col">
					<div className="container fixed-bottom">
						<div className="card">
							<div className="card-body text-center">
								<audio
									ref={audio}
									src={
										"https://assets.breatheco.de/apis/sound/" +
										props.cancionActual.url
									}
								/>
								<div className="row align-items-center p-4">
									<div className="col-2">
										<div className="row align-items-center">
											<div
												ref={loopButton}
												onClick={loop}>
												<i className="fas fa-redo-alt"></i>
											</div>
											<div
												ref={randomButton}
												className="ml-3"
												onClick={() => {
													if (props.desordenar()) {
														randomButton.current.className =
															"text-primary ml-3";
													} else {
														randomButton.current.className =
															"ml-3";
													}
												}}>
												<i className="fas fa-random"></i>
											</div>
										</div>
									</div>
									<div className="col">
										<div
											onClick={() => {
												props.cancionAnterior();
											}}>
											<i className="fas fa-2x fa-backward"></i>
										</div>
									</div>
									<div className="col">
										<div onClick={play}>
											<i
												ref={playButton}
												className="fas fa-2x fa-play"></i>
										</div>
									</div>
									<div className="col">
										<div
											onClick={() => {
												props.cancionSiguiente();
											}}>
											<i className="fas fa-2x fa-forward"></i>
										</div>
									</div>
									<div className="col-2">
										<div className="row justify-content-between align-items-center">
											<div onClick={bajarVolumen}>
												<i className="fas fa-volume-down"></i>
											</div>
											<div ref={volumen}>100 %</div>
											<div onClick={suvirVolumen}>
												<i className="fas fa-volume-up"></i>
											</div>
										</div>
									</div>
								</div>
								<div className="row mt-3">
									<div className="col">
										<div className="form-group">
											<input
												ref={range}
												type="range"
												className="form-control-range"
												min="0"
												max={duration}
												onChange={() => {
													audio.current.currentTime =
														range.current.value;
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

Controls.propTypes = {
	cancionSiguiente: PropTypes.func,
	cancionAnterior: PropTypes.func,
	desordenar: PropTypes.func,
	cancionActual: PropTypes.object
};
