import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import { useContext, useEffect, useState } from "react";
import { FeedbackContext } from "../contexts/FeedbackContext";
import API from "../utils/PokemonAPI";

const PokemonList = () => {
  const { feedbackDispatch } = useContext(FeedbackContext);
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    API.getPokemons(feedbackDispatch, setPokemons, setTotalItems, page, 20);
  }, [page]);

  return (
    <Container>
      <Grid container spacing={2}>
        {pokemons &&
          pokemons.map((pokemon, index) => (
            <Grid item key={index} xs={6} md={3}>
              <PokemonCard pokemon={pokemon} />
            </Grid>
          ))}
      </Grid>
      {pokemons && (
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ paddingTop: 2, paddingBottom: 2 }}
          spacing={2}
        >
          <Typography variant="body1">{`Page ${page + 1} of ${Math.ceil(
            totalItems / 20
          )}`}</Typography>
          {page > 0 && (
            <Button
              variant="contained"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous
            </Button>
          )}
          {page < Math.ceil(totalItems / 20) - 1 && (
            <Button
              variant="contained"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Button>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default PokemonList;
