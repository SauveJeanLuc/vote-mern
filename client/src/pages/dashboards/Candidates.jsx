import { Container } from "react-bootstrap"
import Card from "../../components/CandidateCard"
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import NavigationBar from '../../components/NavigationBar';

export default function Candidate() {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {

        async function pullData(){
            // Check If User is Authenticated
            const token = localStorage.getItem('token');
            if (token) {
        
                const user = jwt_decode(token);
        
                if(!user) {
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                } else {
                    const req = await fetch('http://localhost:3030/api/candidate/all', {
                        method: 'GET',
                        headers: {
                        'x-access-token': localStorage.getItem('token')
                        },       
                    })
        
                    const data = await req.json()
                    setCandidates(data.data)
                    // console.log(data.data[0].firstName)
                }

            } else{

                window.location.href = '/login'
            }
        }

        pullData();
        
    }, [])
    

    return(
        <>
            <NavigationBar isLoggedIn={true} isViewing={true}/>
            <Container className="d-flex flex-wrap justify-content-between ">
                {candidates.map((candidate) => (
                    <Card candidate={candidate}/>
                ))}
            </Container>
        </>
    )

}