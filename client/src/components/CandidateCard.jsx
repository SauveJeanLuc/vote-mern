import { Button, Container, Form , Row, Card} from "react-bootstrap"


export default function CandidateCard({candidate}) {

    async function handleVote(event){
        event.preventDefault()
        
        const response = await fetch(`http://localhost:3030/api/candidate/vote/${candidate._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        const data = await response.json();

        if(data.data){
            window.location.href = '/candidate'
        }else {
            alert('Error Occured');
        }

    }

    return(
        <Card style={{ width: '18rem' }} className="flex-fill p-4 m-4 w-1 h-10">
            <Card.Img variant="top"  src={candidate.profileUrl} />
            <Card.Body>
                <Card.Title> {candidate.firstName} </Card.Title>
                <Card.Text>
                    VOTES: {candidate.nbrOfVotes}
                </Card.Text>
                <Button variant="primary" onClick={handleVote}>VOTE</Button>
            </Card.Body>
        </Card>
    )

}