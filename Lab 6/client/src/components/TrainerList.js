import { Table, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

function TrainerList({ handleSelectTrainer, handleDeleteTrainer }) {
    const trainers = useSelector((state) => state.allTrainers);

    return (
        trainers &&
        trainers.length > 0 && (
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Table>
                        <thead>
                            <tr>
                                <th className="text-center">Trainer</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trainers.map((currentTrainer) => (
                                <tr key={currentTrainer.id}>
                                    <td className="text-center">
                                        {currentTrainer.name}
                                    </td>
                                    <td className="text-center">
                                        {currentTrainer.isSelected ? (
                                            <button
                                                className="btn btn-success btn-sm mx-1"
                                                type="button"
                                            >
                                                Selected
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-info btn-sm mx-1"
                                                type="button"
                                                onClick={() =>
                                                    handleSelectTrainer(
                                                        currentTrainer.id
                                                    )
                                                }
                                            >
                                                Select Trainer
                                            </button>
                                        )}
                                        {!currentTrainer.isSelected && (
                                            <button
                                                className="btn btn-danger btn-sm"
                                                type="button"
                                                onClick={() =>
                                                    handleDeleteTrainer(
                                                        currentTrainer.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col></Col>
            </Row>
        )
    );
}

export default TrainerList;
