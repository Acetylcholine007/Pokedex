import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  capitalize,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Card elevation={4}>
      <CardActionArea onClick={() => navigate(`/${pokemon.name}`)}>
        <CardMedia
          component="img"
          height="150px"
          image="https://images.stockx.com/images/Wand-Company-Pokemon-Die-Cast-Poke-Ball-Replica-3.jpg"
          alt={pokemon.name}
          sx={{ objectFit: "contain" }}
        />
        <CardContent align='center' sx={{backgroundColor: 'primary.light'}}>
          <Typography gutterBottom variant="h5" component="div">
            {capitalize(pokemon.name)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
