import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedPrinter } from "./printerSlice";
import { FaWindows } from "react-icons/fa";
import { GrApple } from "react-icons/gr";
import { VscTerminalLinux } from "react-icons/vsc";
import { SiPhp } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiNestjs } from "react-icons/si";


export function Developpeur() {
    const printer = useSelector(selectedPrinter);
    const printerId = printer._id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedPlatform, setSelectedPlatform] = useState<string>("mac");
    const [selectedLanguage, setSelectedLanguage] = useState<string>("php");


    return (
        <div>
            <br />
            <br />
            <br />
            <br />
            <h2 style={{ fontFamily: 'cursive' }}>site web:</h2>
            <p> {printer.url}</p>
            <h2 style={{ fontFamily: 'cursive' }}>Api-key:</h2>
            <input style={{ width: '50%', fontFamily: 'cursive' }} defaultValue={printer.apiKey} />
            <br />
            <br />
            <h2 style={{ fontFamily: 'cursive' }}>Guide de mise en marche</h2>
            <div>
                <h4 style={{ fontFamily: 'cursive', textDecoration: 'underline', marginBottom: '0', display: 'inline' }}>Etape1: </h4>
                <p style={{ fontFamily: 'cursive', display: 'inline', fontSize:'18px'  }}>Télècharger l'application desktop de votre imprimante</p>
            </div>
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                    <GrApple onClick={() => setSelectedPlatform('mac')} style={{ cursor: 'pointer', opacity: selectedPlatform === 'mac' ? '1' : '0.5',width: '85px', height: '85px' }} />
                    {selectedPlatform === 'mac' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
                <div style={{ marginRight: '10px' }}>
                    <FaWindows onClick={() => setSelectedPlatform('windows')} style={{ cursor: 'pointer', opacity: selectedPlatform === 'windows' ? '1' : '0.5', width: '85px', height: '85px' }} />
                    {selectedPlatform === 'windows' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
                <div>
                    <VscTerminalLinux onClick={() => setSelectedPlatform('linux')} style={{ cursor: 'pointer', opacity: selectedPlatform === 'linux' ? '1' : '0.5',width: '85px', height: '85px' }} />
                    {selectedPlatform === 'linux' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
            </div>
            <br />
            <br />
            <div>
                <h4 style={{ fontFamily: 'cursive', textDecoration: 'underline', marginBottom: '0', display: 'inline' }}>Etape2: </h4>
                <p style={{ fontFamily: 'cursive', display: 'inline',fontSize:'18px' }}>connecter l'imprimante à votre ordinateur</p>
            </div>
            <p style={{ fontFamily: 'cursive', display: 'inline',fontSize:'15px' }}>Assurez vous que l'imprimanté est connecté à votre ordinateur L'application peut utiliser plusieurs <br/> imprimante à la fois</p>
            <br />
            <br />
            <div>
                <h4 style={{ fontFamily: 'cursive', textDecoration: 'underline', marginBottom: '0', display: 'inline' }}>Etape3: </h4>
                <p style={{ fontFamily: 'cursive', display: 'inline',fontSize:'18px' }}>Associer le site à votre ordinateur</p>
            </div>
            <p style={{ fontFamily: 'cursive', display: 'inline',fontSize:'15px' }}>copier le token du connecteur dans votre espace manager et mettez le dans l'application <br/> Choisissez l'imrimante dans laquelle vous allez imprimez votre ticket de caisse ou vos fatures</p>
            <br />
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px' }}>
                    <SiPhp onClick={() => setSelectedLanguage('php')} style={{ cursor: 'pointer', opacity: selectedLanguage === 'php' ? '1' : '0.5',width: '85px', height: '85px' }} />
                    {selectedLanguage === 'php' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
                <div style={{ marginRight: '10px' }}>
                    <SiPython onClick={() => setSelectedLanguage('python')} style={{ cursor: 'pointer', opacity: selectedLanguage === 'python' ? '1' : '0.5', width: '85px', height: '85px' }} />
                    {selectedLanguage === 'python' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
                <div>
                    <SiNestjs onClick={() => setSelectedLanguage('nestjs')} style={{ cursor: 'pointer', opacity: selectedLanguage === 'nestjs' ? '1' : '0.5',width: '85px', height: '85px' }} />
                    {selectedLanguage === 'nestjs' && <span style={{ marginLeft: '5px' }}></span>}
                </div>
            </div>
        </div>
    );
}
