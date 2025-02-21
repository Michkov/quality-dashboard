package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// Password holds the schema definition for the Password entity.
type Repository struct {
	ent.Schema
}

// Fields of the Password.
func (Repository) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("repo_id").
			Unique(),
		field.Text("repository_name").
			SchemaType(textSchema).
			NotEmpty().
			Unique(),
		field.Text("git_organization").
			SchemaType(textSchema).
			NotEmpty(),
		field.Text("description").
			SchemaType(textSchema).
			NotEmpty(),
		field.Text("git_url").
			SchemaType(textSchema).
			NotEmpty(),
	}
}

// Edges of the Password.
func (Repository) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("repositories", Teams.Type).
			Ref("repositories").
			Unique(),
		edge.To("workflows", Workflows.Type),
		edge.To("codecov", CodeCov.Type),
		edge.To("prow_suites", ProwSuites.Type),
		edge.To("prow_jobs", ProwJobs.Type),
	}
}
