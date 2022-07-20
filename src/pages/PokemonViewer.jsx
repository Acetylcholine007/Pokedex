import {
  Container,
  Grid,
  Typography,
  Stack,
  Chip,
  Box,
  capitalize,
  Card,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import LocationDialog from "../components/LocationDialog";
import PokemonStats from "../components/PokemonStats";
import { FeedbackContext } from "../contexts/FeedbackContext";
import API from "../utils/PokemonAPI";

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: `0.25rem 0.25rem 0.25rem !important`,
  backgroundColor: theme.palette.secondary.dark,
  color: "white",
}));

const PokemonViewer = () => {
  const { feedbackDispatch } = useContext(FeedbackContext);
  const [pokemon, setPokemon] = useState(null);
  const { pokemonName } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    API.getPokemon(feedbackDispatch, setPokemon, pokemonName);
  }, []);

  const openDialog = useCallback((selectedUrl) => {
    setShowDialog(true);
    setUrl(selectedUrl);
  }, []);

  const closeDialog = useCallback(() => setShowDialog(false), []);

  return (
    <Container>
      {pokemon && (
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Card elevation={4}>
              <Carousel style={{ alignItems: "center" }}>
                {["dream_world", "home", "official-artwork"].map((key) => (
                  <Box
                    sx={{ display: "flex", justifyContent: "center" }}
                    key={key}
                  >
                    <img
                      src={pokemon.sprites.other[key].front_default}
                      alt={key}
                      style={{ height: "20rem", objectFit: "contain" }}
                    />
                  </Box>
                ))}
              </Carousel>
            </Card>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography variant="h3">{capitalize(pokemon.name)}</Typography>
            <Divider sx={{ marginTop: 2, marginBottom: 1 }} />
            <Typography variant="h4">
              {pokemon.types.length !== 0 ? "Types" : "No Type"}
            </Typography>
            {pokemon.types.length !== 0 && (
              <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                {pokemon.types.map((type, index) => (
                  <StyledChip label={capitalize(type.type.name)} key={index} />
                ))}
              </Stack>
            )}
            <Typography variant="h4">
              {pokemon.abilities.length !== 0 ? "Abilities" : "No Abilities"}
            </Typography>
            {pokemon.abilities.length !== 0 && (
              <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                {pokemon.abilities.map((ability, index) => (
                  <StyledChip
                    label={capitalize(ability.ability.name)}
                    key={index}
                  />
                ))}
              </Stack>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4">Stats</Typography>
            <PokemonStats pokemon={pokemon} openDialog={openDialog} />
          </Grid>
        </Grid>
      )}
      <LocationDialog open={showDialog} handleClose={closeDialog} url={url} />
    </Container>
  );
};

export default PokemonViewer;
