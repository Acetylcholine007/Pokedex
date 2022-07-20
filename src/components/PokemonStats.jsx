import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  capitalize,
  Chip,
  Stack,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: `0.25rem 0.25rem 0.25rem !important`,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const PokemonStats = ({ pokemon, openDialog }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 480 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="30%">Attribute</StyledTableCell>
            <StyledTableCell width="70%">Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>Base Experience</StyledTableCell>
            <StyledTableCell>{pokemon.base_experience}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Height</StyledTableCell>
            <StyledTableCell>{`${pokemon.height / 10} m`}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Weight</StyledTableCell>
            <StyledTableCell>{`${pokemon.weight / 10} kg`}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Species</StyledTableCell>
            <StyledTableCell>{capitalize(pokemon.species.name)}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Forms</StyledTableCell>
            <StyledTableCell>
              {pokemon.forms.length !== 0 && (
                <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                  {pokemon.forms.map((form, index) => (
                    <StyledChip label={capitalize(form.name)} key={index} />
                  ))}
                </Stack>
              )}
              {pokemon.forms.length === 0 && "No Forms"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Held Items</StyledTableCell>
            <StyledTableCell>
              {pokemon.held_items.length !== 0 && (
                <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                  {pokemon.held_items.map((item, index) => (
                    <StyledChip
                      label={capitalize(item.item.name)}
                      key={index}
                    />
                  ))}
                </Stack>
              )}
              {pokemon.held_items.length === 0 && "No Held Items"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Location Area Encounters</StyledTableCell>
            <StyledTableCell>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => openDialog(pokemon.location_area_encounters)}
              >
                See Location Encounters
              </Button>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Moves</StyledTableCell>
            <StyledTableCell>
              {
                <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                  {pokemon.moves.length !== 0 &&
                    pokemon.moves.map((move, index) => (
                      <StyledChip
                        label={capitalize(move.move.name)}
                        key={index}
                      />
                    ))}
                </Stack>
              }
              {pokemon.moves.length === 0 && "No Past Types"}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Past Types</StyledTableCell>
            <StyledTableCell>
              {pokemon.past_types.length !== 0 &&
                pokemon.past_types.map((category, index) => (
                  <Box key={index}>
                    <Typography variant="h6">
                      {capitalize(category.generation.name)}
                    </Typography>
                    <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                      {category.types.map((type, index) => (
                        <StyledChip
                          label={capitalize(type.type.name)}
                          key={index}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}
              {pokemon.past_types.length === 0 && "No Past Types"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonStats;
